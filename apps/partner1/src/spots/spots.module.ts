import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsCoreModule } from '@app/core/spots/spots_core.module';

@Module({
  imports: [SpotsCoreModule],
  controllers: [SpotsController],
})
export class SpotsModule {}
