import {
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  year?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  range_km?: number;

  @IsString()
  @IsOptional()
  condition?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  @IsOptional()
  battery_capacity_kWh?: number;

  @IsNumber()
  @IsOptional()
  charging_speed_kW?: number;

  @IsNumber()
  @IsOptional()
  seats?: number;

  @IsEnum(['FWD', 'RWD', 'AWD'])
  @IsOptional()
  drivetrain?: 'FWD' | 'RWD' | 'AWD';

  @IsNumber()
  @IsOptional()
  kilometer_count?: number;

  @IsBoolean()
  @IsOptional()
  autopilot?: boolean;

  @IsBoolean()
  @IsOptional()
  accidents?: boolean;

  @IsString()
  @IsOptional()
  accident_description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  color?: string;
}
