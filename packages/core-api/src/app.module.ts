import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { TenantMiddleware } from './common/tenant.middleware';
import { TenantsController } from './tenants/tenants.controller';
import { SitesController } from './sites/sites.controller';
import { PagesController } from './pages/pages.controller';

@Module({
  controllers: [TenantsController, SitesController, PagesController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
