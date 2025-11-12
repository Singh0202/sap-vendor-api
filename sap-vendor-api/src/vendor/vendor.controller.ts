import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { MapInputDto } from './dto/map-input.dto';
import { MapOutputDto } from './dto/map-output.dto';
import { BasicAuthGuard } from '../auth/basic-auth.guard';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  async createVendor(@Body() mapInputDto: MapInputDto): Promise<MapOutputDto> {
    return this.vendorService.createVendor(mapInputDto);
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async getVendors(): Promise<MapOutputDto[]> {
    return this.vendorService.getVendors();
  }
}