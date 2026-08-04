import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../common/prisma.service';
import { validateComponent } from '@fabrika/dsl';
import type { ComponentDSL } from '@fabrika/dsl';
import { isCapabilityAuthorized } from '@fabrika/capabilities';

function validateUuid(id: string, name: string) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new BadRequestException(`Invalid ${name} ID format`);
  }
}

@Controller('sites/:siteId/pages')
export class PagesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async list(@Param('siteId') siteId: string) {
    validateUuid(siteId, 'site');
    return this.prisma.page.findMany({ where: { siteId } });
  }

  @Get(':id')
  async get(@Param('siteId') siteId: string, @Param('id') id: string) {
    validateUuid(siteId, 'site');
    validateUuid(id, 'page');
    const page = await this.prisma.page.findFirst({
      where: { id, siteId },
    });
    if (!page) throw new NotFoundException('Page not found');
    return page;
  }

  @Post()
  async create(
    @Param('siteId') siteId: string,
    @Body() body: { title: string; slug: string; dsl: ComponentDSL },
  ) {
    validateUuid(siteId, 'site');
    const validation = validateComponent(body.dsl);
    if (!validation.valid) {
      throw new HttpException(
        { message: 'DSL inválido', errors: validation.errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const capability of body.dsl.permissions) {
      if (!isCapabilityAuthorized(capability, body.dsl.permissions)) {
        throw new HttpException(
          { message: `Capability no autorizada: ${capability}` },
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const site = await this.prisma.site.findFirst({
      where: { id: siteId },
    });
    if (!site) throw new NotFoundException('Site not found');

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
    validateUuid(id, 'page');
    if (body.dsl) {
      const validation = validateComponent(body.dsl);
      if (!validation.valid) {
        throw new HttpException(
          { message: 'DSL inválido', errors: validation.errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const data: Record<string, unknown> = {};
    if (body.title) data.title = body.title;
    if (body.dsl) data.dsl = body.dsl;
    if (body.state) data.state = body.state;

    return this.prisma.page.update({
      where: { id },
      data: data as never,
    });
  }
}
