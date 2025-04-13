import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column('float')
  price: number;

  @Column('float')
  range_km: number;

  @Column()
  color: string;

  @Column()
  condition: string;

  @Column('float')
  battery_capacity_kWh: number;

  @Column('float')
  charging_speed_kW: number;

  @Column()
  seats: number;

  @Column()
  drivetrain: string;

  @Column()
  location: string;

  @Column()
  autopilot: boolean;

  @Column()
  kilometer_count: number;

  @Column()
  accidents: boolean;

  @Column({ type: 'text', nullable: true })
  accident_description: string | null;

  @Column('text', { array: true })
  images: string[];
}
