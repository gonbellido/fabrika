-- Fabrika — init.sql
-- Esquema inicial con Row-Level Security

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Tenants ──────────────────────────────────────────────

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- ── Users (dentro de un tenant) ──────────────────────────

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  keycloak_id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, email)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ── Sites ────────────────────────────────────────────────

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  name TEXT NOT NULL,
  domain TEXT,
  settings JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- ── Pages ────────────────────────────────────────────────

CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  dsl JSONB NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('draft', 'preview', 'published')) DEFAULT 'draft',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(site_id, slug)
);

CREATE INDEX idx_pages_site ON pages(site_id);
CREATE INDEX idx_pages_tenant ON pages(tenant_id);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- ── Page Versions (historial inmutable) ──────────────────

CREATE TABLE page_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  dsl JSONB NOT NULL,
  version INTEGER NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_page_versions_page ON page_versions(page_id);

ALTER TABLE page_versions ENABLE ROW LEVEL SECURITY;

-- ── Media ────────────────────────────────────────────────

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- ── RLS Policies ─────────────────────────────────────────

-- Helper: current tenant from session
-- La aplicación setea current_setting('app.current_tenant_id') al inicio de cada request

-- tenants: solo el propio tenant puede leerse
CREATE POLICY tenant_isolation ON tenants
  FOR ALL
  USING (id = current_setting('app.current_tenant_id')::uuid);

-- users: dentro del tenant, admin ve todos, editor/viewer solo a sí mismo
CREATE POLICY users_tenant_isolation ON users
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- sites
CREATE POLICY sites_tenant_isolation ON sites
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- pages
CREATE POLICY pages_tenant_isolation ON pages
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- page_versions
CREATE POLICY page_versions_tenant_isolation ON page_versions
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- media
CREATE POLICY media_tenant_isolation ON media
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

-- ── Seed data ────────────────────────────────────────────

INSERT INTO tenants (id, name, slug) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Demo Tenant', 'demo');
