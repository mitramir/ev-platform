import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { NotFoundException } from '@nestjs/common';

describe('VehicleService', () => {
  let service: VehicleService;

  // Mock repository methods
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    // Removed: repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const vehicles = [
        { id: '1', brand: 'Tesla', model: 'Model S' },
        { id: '2', brand: 'Nissan', model: 'Leaf' },
      ];
      mockRepository.find.mockResolvedValue(vehicles);

      const result = await service.findAll();
      expect(result).toEqual(vehicles);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by ID', async () => {
      const vehicle = { id: '1', brand: 'Tesla', model: 'Model S' };
      mockRepository.findOne.mockResolvedValue(vehicle);

      const result = await service.findOne('1');
      expect(result).toEqual(vehicle);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
