-- ============================================================================
-- Adilay Roofing CMS — Supabase Schema
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('admin', 'editor')),
  created_at timestamptz default now()
);

-- ============================================================================
-- 2. PAGES TABLE — SEO metadata for every page
-- ============================================================================
create table public.pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  custom_head_tags text,
  status text not null default 'draft' check (status in ('published', 'draft')),
  updated_at timestamptz default now(),
  updated_by text
);

create index idx_pages_slug on public.pages (slug);
create index idx_pages_status on public.pages (status);

-- ============================================================================
-- 3. CONTENT BLOCKS TABLE — rich content per page
-- ============================================================================
create table public.content_blocks (
  id uuid primary key default uuid_generate_v4(),
  page_id uuid not null references public.pages(id) on delete cascade,
  block_type text not null check (block_type in ('rich_text', 'heading', 'image', 'cta', 'faq', 'structured_service', 'structured_location', 'structured_faq', 'structured_about', 'structured_home', 'structured_blog')),
  content jsonb not null default '{}',
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);

create index idx_content_blocks_page on public.content_blocks (page_id);

-- ============================================================================
-- 4. INTERNAL LINKS TABLE
-- ============================================================================
create table public.internal_links (
  id uuid primary key default uuid_generate_v4(),
  source_page_id uuid not null references public.pages(id) on delete cascade,
  target_page_id uuid not null references public.pages(id) on delete cascade,
  anchor_text text not null,
  context text,
  updated_at timestamptz default now()
);

create index idx_internal_links_source on public.internal_links (source_page_id);
create index idx_internal_links_target on public.internal_links (target_page_id);

-- ============================================================================
-- 5. PENDING CHANGES TABLE — approval queue
-- ============================================================================
create table public.pending_changes (
  id uuid primary key default uuid_generate_v4(),
  table_name text not null,
  record_id uuid not null,
  change_type text not null check (change_type in ('create', 'update', 'delete')),
  old_value jsonb,
  new_value jsonb not null,
  submitted_by text not null,
  submitted_at timestamptz default now(),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by text,
  reviewed_at timestamptz,
  notes text
);

create index idx_pending_changes_status on public.pending_changes (status);

-- ============================================================================
-- 6. ACTIVITY LOG TABLE
-- ============================================================================
create table public.activity_log (
  id uuid primary key default uuid_generate_v4(),
  user_email text not null,
  action text not null,
  details jsonb default '{}',
  created_at timestamptz default now()
);

create index idx_activity_log_created on public.activity_log (created_at desc);
create index idx_activity_log_user on public.activity_log (user_email);

-- ============================================================================
-- 7. BLOG POSTS TABLE — CMS-managed blog content
-- ============================================================================
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  author text not null default 'Adilay Roofing',
  date date not null default current_date,
  category text not null default 'general-roofing',
  read_time text default '5 min read',
  featured_image text,
  primary_keyword text,
  secondary_keywords text[] default '{}',
  body_html text not null default '',
  faq jsonb default '[]',
  status text not null default 'draft' check (status in ('published', 'draft')),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  updated_by text
);

create index idx_blog_posts_slug on public.blog_posts (slug);
create index idx_blog_posts_status on public.blog_posts (status);
create index idx_blog_posts_date on public.blog_posts (date desc);

-- RLS for blog_posts
alter table public.blog_posts enable row level security;

create policy "Blog posts: anyone authenticated can read"
  on public.blog_posts for select
  to authenticated
  using (true);

create policy "Blog posts: admin full access"
  on public.blog_posts for all
  to authenticated
  using (public.get_user_role() = 'admin');

create policy "Blog posts: public read published"
  on public.blog_posts for select
  to anon
  using (status = 'published' and date <= current_date);

-- ============================================================================
-- 8. AUTO-UPDATE updated_at TRIGGERS
-- ============================================================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger pages_updated_at
  before update on public.pages
  for each row execute function public.update_updated_at();

create trigger content_blocks_updated_at
  before update on public.content_blocks
  for each row execute function public.update_updated_at();

create trigger internal_links_updated_at
  before update on public.internal_links
  for each row execute function public.update_updated_at();

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.update_updated_at();

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.pages enable row level security;
alter table public.content_blocks enable row level security;
alter table public.internal_links enable row level security;
alter table public.pending_changes enable row level security;
alter table public.activity_log enable row level security;

-- Helper function: get user role from JWT
create or replace function public.get_user_role()
returns text as $$
begin
  return (
    select role from public.users
    where email = auth.jwt() ->> 'email'
    limit 1
  );
end;
$$ language plpgsql security definer;

-- ---- USERS ----
create policy "Users: anyone authenticated can read"
  on public.users for select
  to authenticated
  using (true);

create policy "Users: admin full access"
  on public.users for all
  to authenticated
  using (public.get_user_role() = 'admin');

-- ---- PAGES ----
create policy "Pages: anyone authenticated can read"
  on public.pages for select
  to authenticated
  using (true);

create policy "Pages: admin full access"
  on public.pages for all
  to authenticated
  using (public.get_user_role() = 'admin');

-- Allow anonymous/public read for published pages (frontend ISR)
create policy "Pages: public read published"
  on public.pages for select
  to anon
  using (status = 'published');

-- ---- CONTENT BLOCKS ----
create policy "Content blocks: anyone authenticated can read"
  on public.content_blocks for select
  to authenticated
  using (true);

create policy "Content blocks: admin full access"
  on public.content_blocks for all
  to authenticated
  using (public.get_user_role() = 'admin');

-- Public read for frontend rendering
create policy "Content blocks: public read"
  on public.content_blocks for select
  to anon
  using (
    exists (
      select 1 from public.pages
      where pages.id = content_blocks.page_id
      and pages.status = 'published'
    )
  );

-- ---- INTERNAL LINKS ----
create policy "Internal links: anyone authenticated can read"
  on public.internal_links for select
  to authenticated
  using (true);

create policy "Internal links: admin full access"
  on public.internal_links for all
  to authenticated
  using (public.get_user_role() = 'admin');

-- Public read for frontend
create policy "Internal links: public read"
  on public.internal_links for select
  to anon
  using (true);

-- ---- PENDING CHANGES ----
create policy "Pending changes: editors can insert"
  on public.pending_changes for insert
  to authenticated
  with check (true);

create policy "Pending changes: editors see own submissions"
  on public.pending_changes for select
  to authenticated
  using (
    public.get_user_role() = 'admin'
    or submitted_by = auth.jwt() ->> 'email'
  );

create policy "Pending changes: admin full access"
  on public.pending_changes for all
  to authenticated
  using (public.get_user_role() = 'admin');

-- ---- ACTIVITY LOG ----
create policy "Activity log: admin reads all, editors read own"
  on public.activity_log for select
  to authenticated
  using (
    public.get_user_role() = 'admin'
    or user_email = auth.jwt() ->> 'email'
  );

create policy "Activity log: anyone authenticated can insert"
  on public.activity_log for insert
  to authenticated
  with check (true);

-- ============================================================================
-- DONE! Next steps:
-- 1. Go to Authentication > Users and create your admin user
-- 2. After they sign up, insert a row in the users table:
--    INSERT INTO public.users (email, name, role) VALUES ('your@email.com', 'Moshe', 'admin');
-- ============================================================================
