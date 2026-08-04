import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { PrismaService } from '../common/prisma.service';
import { validateComponent } from '@fabrika/dsl';
import type { ComponentDSL } from '@fabrika/dsl';
import { isCapabilityAuthorized } from '@fabrika/capabilities';

@Controller('sites/:siteId/pages')
export class PagesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Param('siteId') siteId: string) {
    return this.prisma.page.findMany({ where: { siteId } });
  }

  @Get(':id')
  async get(@Param('siteId') siteId: string, @Param('id') id: string) {
    return this.prisma.page.findFirstOrThrow({ where: { id, siteId } });
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() body: { title: string; slug: string; dsl: ComponentDSL },
  ) {
    // Validate DSL
    const validation = validateComponent(body.dsl);
    if (!validation.valid) {
      throw new HttpException(
        { message: 'DSL inválido', errors: validation.errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate capabilities
    for (const capability of body.dsl.permissions) {
      if (!isCapabilityAuthorized(capability, body.dsl.permissions)) {
        throw new HttpException(
          { message: `Capability no autorizada: ${capability}` },
          HttpStatus.FORBIDDEN,
        );
      }
    }

    // Get site to obtain tenant_id
    const site = await this.prisma.site.findFirstOrThrow({
      where: { id: siteId },
    });

    return this.prisma.page.create({
      data: {
        title: body.title,
        slug: body.slug,
        dsl: body.dsl as object,
        siteId,
        tenantId: site.tenantId,
      },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title?: string; dsl?: ComponentDSL; state?: string },
  ) {
    if (body.dsl) {
      const validation = validateComponent(body.dsl);
      if (!validation.valid) {
        throw new HttpException(
          { message: 'DSL inválido', errors: validation.errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.prisma.page.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.dsl && { dsl: body.dsl as object, version: { increment: 1 } }),
        ...(body.state && { state: body.state }),
      },
    });
  }
}
