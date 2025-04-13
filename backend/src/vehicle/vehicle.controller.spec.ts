import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { NotFoundException } from '@nestjs/common';

describe('VehicleController', () => {
  let controller: VehicleController;

  // Mock VehicleService
  const mockVehicleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const vehicles: Vehicle[] = [
        {
          id: '1',
          brand: 'Tesla',
          model: 'Model S',
          year: 2020,
          price: 79999,
        } as Vehicle,
        {
          id: '2',
          brand: 'Nissan',
          model: 'Leaf',
          year: 2019,
          price: 29999,
        } as Vehicle,
      ];
      mockVehicleService.findAll.mockResolvedValue(vehicles);

      const result = await controller.findAll();
      expect(result).toEqual(vehicles);
      expect(mockVehicleService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by ID', async () => {
      const vehicle: Vehicle = {
        id: '1',
        brand: 'Tesla',
        model: 'Model S',
        year: 2020,
        price: 79999,
      } as Vehicle;
      mockVehicleService.findOne.mockResolvedValue(vehicle);

      const result = await controller.findOne('1');
      expect(result).toEqual(vehicle);
      expect(mockVehicleService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      mockVehicleService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockVehicleService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create and return a vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        brand: 'BMW',
        model: 'i4',
        year: 2022,
        price: 55000,
        range_km: 480,
        color: 'Blue',
        condition: 'New',
        battery_capacity_kWh: 80,
        charging_speed_kW: 150,
        seats: 5,
        drivetrain: 'RWD',
        location: 'Hamburg',
        autopilot: false,
        kilometer_count: 0,
        accidents: false,
        images: ['https://example.com/image.jpg'],
      };
      const vehicle: Vehicle = { id: '1', ...createVehicleDto } as Vehicle;
      mockVehicleService.create.mockResolvedValue(vehicle);

      const result = await controller.create(createVehicleDto);
      expect(result).toEqual(vehicle);
      expect(mockVehicleService.create).toHaveBeenCalledWith(createVehicleDto);
    });
  });

  describe('update', () => {
    it('should update and return the vehicle', async () => {
      const updateVehicleDto: Partial<CreateVehicleDto> = { price: 54000 };
      const vehicle: Vehicle = {
        id: '1',
        brand: 'Tesla',
        model: 'Model S',
        year: 2020,
        price: 54000,
      } as Vehicle;
      mockVehicleService.update.mockResolvedValue(vehicle);

      const result = await controller.update('1', updateVehicleDto);
      expect(result).toEqual(vehicle);
      expect(mockVehicleService.update).toHaveBeenCalledWith(
        '1',
        updateVehicleDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      mockVehicleService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(mockVehicleService.remove).toHaveBeenCalledWith('1');
    });
  });
});
