import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class MapInputDto {
    @IsString()
    @IsNotEmpty()
    vendorName: string;

    @IsString()
    @IsOptional()
    vendorDescription?: string;

    @IsString()
    @IsNotEmpty()
    contactPerson: string;

    @IsString()
    @IsNotEmpty()
    contactEmail: string;

    @IsString()
    @IsOptional()
    contactPhone?: string;
}