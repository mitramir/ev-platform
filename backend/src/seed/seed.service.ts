import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

interface SeedData {
  count: number;
  data: Partial<Vehicle>[];
}

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async seed() {
    const filePath = path.join(__dirname, 'data.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(rawData) as SeedData;

    for (const vehicleData of parsedData.data) {
      await this.vehicleRepository.save(vehicleData);
    }
  }

  async getVehicleCount(): Promise<number> {
    return this.vehicleRepository.count();
  }
}
