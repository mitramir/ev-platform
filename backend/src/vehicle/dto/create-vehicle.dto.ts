import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;

  @IsNumber()
  range_km: number;

  @IsString()
  color: string;

  @IsString()
  condition: string;

  @IsNumber()
  battery_capacity_kWh: number;

  @IsNumber()
  charging_speed_kW: number;

  @IsNumber()
  seats: number;

  @IsString()
  drivetrain: string;

  @IsString()
  location: string;

  @IsBoolean()
  autopilot: boolean;

  @IsNumber()
  kilometer_count: number;

  @IsBoolean()
  accidents: boolean;

  @IsString()
  @IsOptional()
  accident_description?: string;

  @IsArray()
  images: string[];
}
