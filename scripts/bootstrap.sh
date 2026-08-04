#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════
# Fabrika Bootstrap Script
# Levanta toda la plataforma en un comando
# ═══════════════════════════════════════

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║     FABRIKA — BOOTSTRAP             ║"
echo "╚══════════════════════════════════════╝"
echo ""

# 1. Install dependencies
echo "━━━ 1/5 Installing dependencies ━━━"
pnpm install
echo ""

# 2. Start infrastructure
echo "━━━ 2/5 Starting Docker services ━━━"
docker compose -f infra/docker/docker-compose.yml up -d
echo "Waiting for PostgreSQL..."
until docker exec fabrika-postgres pg_isready -U fabrika >/dev/null 2>&1; do
  sleep 1
done
echo "✅ PostgreSQL ready"
echo ""

# 3. Setup database
echo "━━━ 3/5 Running migrations ━━━"
pnpm --filter @fabrika/core-api exec prisma migrate dev --name init 2>/dev/null || \
  pnpm --filter @fabrika/core-api exec prisma db push
echo "✅ Database ready"
echo ""

# 4. Build packages
echo "━━━ 4/5 Building packages ━━━"
pnpm run build
echo "✅ Build complete"
echo ""

# 5. Seed demo data
echo "━━━ 5/5 Seeding demo data ━━━"
docker exec fabrika-postgres psql -U fabrika -d fabrika -c \
  "INSERT INTO tenants (id, name, slug, updated_at) VALUES ('00000000-0000-0000-0000-000000000001', 'Demo Tenant', 'demo', now()) ON CONFLICT DO NOTHING;" \
  2>/dev/null || true
echo "✅ Seed complete"
echo ""

# Run tests
echo "━━━ Running tests ━━━"
pnpm test 2>&1 | tail -3
echo ""

echo "╔══════════════════════════════════════╗"
echo "║     FABRIKA READY                   ║"
echo "╠══════════════════════════════════════╣"
echo "║  Core API:  http://localhost:3000    ║"
echo "║  Editor:    http://localhost:5173    ║"
echo "║  Site:      http://localhost:4321    ║"
echo "║  Keycloak:  http://localhost:8081    ║"
echo "║  Vault:     http://localhost:8201    ║"
echo "║  PostgreSQL localhost:5433           ║"
echo "╠══════════════════════════════════════╣"
echo "║  Start: pnpm dev                     ║"
echo "║  Test:  pnpm test                    ║"
echo "║  Docs:  docs/                        ║"
echo "╚══════════════════════════════════════╝"
