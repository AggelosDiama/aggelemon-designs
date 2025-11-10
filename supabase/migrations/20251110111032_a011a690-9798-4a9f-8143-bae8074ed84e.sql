-- Add hidden and draft fields to projects table
ALTER TABLE public.projects
ADD COLUMN hidden boolean NOT NULL DEFAULT false,
ADD COLUMN draft boolean NOT NULL DEFAULT false;

-- Add index for better query performance
CREATE INDEX idx_projects_hidden ON public.projects(hidden);
CREATE INDEX idx_projects_draft ON public.projects(draft);