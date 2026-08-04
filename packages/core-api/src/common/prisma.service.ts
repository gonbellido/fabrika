import { Injectable } from '@nestjs/common';
import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// Helper to inject tenant_id into queries (RLS-compatible pattern)
export function withTenant(tenantId: string) {
  return { tenantId };
}

// Helper to inject user scope
export function withUser(tenantId: string, userId: string) {
  return { tenantId, userId };
}
