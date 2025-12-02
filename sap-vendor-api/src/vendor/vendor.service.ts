import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorHeader } from './entities/vendor-header.entity';
import { VendorItem } from './entities/vendor-item.entity';
import { MapInputDto } from './dto/map-input.dto';
import { MapOutputDto } from './dto/map-output.dto';
import { VendorMapper } from './mapper/vendor.mapper';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorHeader)
    private vendorHeaderRepository: Repository<VendorHeader>,
    
    @InjectRepository(VendorItem)
    private vendorItemRepository: Repository<VendorItem>,
  ) {}

  async createVendor(data: MapInputDto): Promise<MapOutputDto> {
    const vendorHeader = this.vendorHeaderRepository.create(data.header);
    const vendorItem = this.vendorItemRepository.create(data.items);

    await this.vendorHeaderRepository.save(vendorHeader);
    await this.vendorItemRepository.save(vendorItem);
    
    console.log("Demo log");
    console.log("Demo log1");

    return VendorMapper.toOutputDto(vendorHeader, vendorItem);
  }

  async updateVendor(id: number, data: MapInputDto): Promise<MapOutputDto> {
    await this.vendorHeaderRepository.update(id, data.header);
    await this.vendorItemRepository.update({ vendorId: id }, data.items);

    const updatedHeader = await this.vendorHeaderRepository.findOne(id);
    const updatedItems = await this.vendorItemRepository.find({ vendorId: id });

    return VendorMapper.toOutputDto(updatedHeader, updatedItems);
  }

  async getVendor(id: number): Promise<MapOutputDto> {
    const vendorHeader = await this.vendorHeaderRepository.findOne(id);
    const vendorItems = await this.vendorItemRepository.find({ vendorId: id });

    return VendorMapper.toOutputDto(vendorHeader, vendorItems);
  }
}