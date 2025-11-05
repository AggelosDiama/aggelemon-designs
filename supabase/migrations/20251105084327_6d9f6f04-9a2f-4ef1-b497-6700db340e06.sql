-- Create storage bucket for project images
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true);

-- Allow authenticated users to upload project images
create policy "Authenticated users can upload project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-images');

-- Allow authenticated users to update their uploaded images
create policy "Authenticated users can update project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-images');

-- Allow authenticated users to delete project images
create policy "Authenticated users can delete project images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-images');

-- Allow public access to view project images
create policy "Public access to project images"
on storage.objects
for select
to public
using (bucket_id = 'project-images');