import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Controller('tenants/:tenantId/sites')
export class SitesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Param('tenantId') tenantId: string) {
    return this.prisma.site.findMany({ where: { tenantId } });
  }

  @Get(':id')
  async get(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    return this.prisma.site.findFirstOrThrow({ where: { id, tenantId } });
  }

  @Post()
  async create(
    @Param('tenantId') tenantId: string,
    @Body() body: { name: string; domain?: string },
  ) {
    return this.prisma.site.create({
      data: { name: body.name, domain: body.domain ?? null, tenantId },
    });
  }
}
