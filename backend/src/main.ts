import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3001', 'http://frontend:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  //conditional seeding to avoid duplicates
  const seedService = app.get(SeedService);
  const vehicleCount = await seedService.getVehicleCount();
  if (vehicleCount === 0) {
    try {
      await seedService.seed();
      logger.log('Database seeded!');
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      logger.error(`Seeding failed: ${error.message}`);
    }
  } else {
    logger.log('Database already seeded, skipping seeding.');
  }

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
