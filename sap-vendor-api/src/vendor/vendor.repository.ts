import { EntityRepository, Repository } from 'typeorm';
import { VendorHeader } from './entities/vendor-header.entity';
import { VendorItem } from './entities/vendor-item.entity';

@EntityRepository(VendorHeader)
export class VendorHeaderRepository extends Repository<VendorHeader> {
    async updateVendorHeader(id: number, data: Partial<VendorHeader>): Promise<VendorHeader> {
        await this.update(id, data);
        return this.findOne(id);
    }
}

@EntityRepository(VendorItem)
export class VendorItemRepository extends Repository<VendorItem> {
    async updateVendorItem(id: number, data: Partial<VendorItem>): Promise<VendorItem> {
        await this.update(id, data);
        return this.findOne(id);
    }
}