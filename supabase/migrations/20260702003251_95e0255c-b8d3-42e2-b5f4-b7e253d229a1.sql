
-- 1. Restrict projects SELECT: hide hidden/draft from public, allow admins to see all
DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (hidden = false AND draft = false);
CREATE POLICY "Admins can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Restrict content blocks SELECT to blocks of visible projects
DROP POLICY IF EXISTS "Content blocks are viewable by everyone" ON public.project_content_blocks;
CREATE POLICY "Public can view blocks of published projects"
  ON public.project_content_blocks FOR SELECT
  TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_content_blocks.project_id
      AND p.hidden = false AND p.draft = false
  ));
CREATE POLICY "Admins can view all content blocks"
  ON public.project_content_blocks FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Restrict project-images storage writes to admins; remove broad listing
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Public access to project images" ON storage.objects;

CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));
-- Admins can list; public still reaches files via bucket's public URL (no listing)
CREATE POLICY "Admins can list project images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Lock down SECURITY DEFINER functions from direct API execution
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- Keep EXECUTE for authenticated on has_role since it is referenced by RLS policies evaluated as the caller.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
