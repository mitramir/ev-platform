import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    this.logger.log('Fetching all vehicles');
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    this.logger.log(`Fetching vehicle with ID ${id}`);
    return this.vehicleService.findOne(id);
  }

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    this.logger.log('Creating a new vehicle', createVehicleDto);
    try {
      const vehicle = await this.vehicleService.create(createVehicleDto);
      this.logger.log('Vehicle created successfully', vehicle);
      return vehicle;
    } catch (error) {
      this.logger.error('Failed to create vehicle');
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    this.logger.log(`Updating vehicle with ID ${id}`, updateVehicleDto);
    try {
      const vehicle = await this.vehicleService.update(id, updateVehicleDto);
      this.logger.log('Vehicle updated successfully', vehicle);
      return vehicle;
    } catch (error) {
      this.logger.error('Failed to update vehicle');
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.logger.log(`Deleting vehicle with ID ${id}`);
    try {
      await this.vehicleService.remove(id);
      this.logger.log('Vehicle deleted successfully');
    } catch (error) {
      this.logger.error('Failed to delete vehicle');
      throw error;
    }
  }
}
