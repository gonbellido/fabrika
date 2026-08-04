import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { Request } from 'express';
import { PrismaService } from '../common/prisma.service';

function validateUuid(id: string, name: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new BadRequestException(`Invalid ${name} ID format`);
  }
}

@Controller('tenants')
export class TenantsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Req() req: Request) {
    if (req.tenantId) {
      return this.prisma.tenant.findMany({ where: { id: req.tenantId } });
    }
    return this.prisma.tenant.findMany();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    validateUuid(id, 'tenant');
    const tenant = await this.prisma.tenant.findUnique({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  @Post()
  async create(@Body() body: { name: string; slug: string }) {
    return this.prisma.tenant.create({
      data: { name: body.name, slug: body.slug },
    });
  }
}
