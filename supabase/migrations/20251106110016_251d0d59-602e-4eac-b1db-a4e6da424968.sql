-- Add project_link field to projects table
ALTER TABLE public.projects ADD COLUMN project_link TEXT;

-- Create enum for content block types
CREATE TYPE public.content_block_type AS ENUM (
  'text',
  'image',
  'gallery',
  'quote',
  'separator'
);

-- Create project_content_blocks table
CREATE TABLE public.project_content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  block_type content_block_type NOT NULL,
  order_index INTEGER NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, order_index)
);

-- Enable RLS on project_content_blocks
ALTER TABLE public.project_content_blocks ENABLE ROW LEVEL SECURITY;

-- RLS policies for project_content_blocks
CREATE POLICY "Content blocks are viewable by everyone"
ON public.project_content_blocks
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create content blocks"
ON public.project_content_blocks
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content blocks"
ON public.project_content_blocks
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content blocks"
ON public.project_content_blocks
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_content_blocks_updated_at
BEFORE UPDATE ON public.project_content_blocks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_project_content_blocks_project_id ON public.project_content_blocks(project_id);
CREATE INDEX idx_project_content_blocks_order ON public.project_content_blocks(project_id, order_index);