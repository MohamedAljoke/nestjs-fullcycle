import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(eventId: string, createSpot: CreateSpotDto) {
    const event = await this.prismaService.event.findFirst({
      where: { id: eventId },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    const query = this.prismaService.spots.create({
      data: {
        ...createSpot,
        status: SpotStatus.available,
        eventId,
      },
    });
    return query;
  }

  findAll(eventId: string) {
    return this.prismaService.spots.findMany({ where: { eventId } });
  }

  findOne(eventId: string, id: string) {
    return this.prismaService.spots.findFirst({
      where: {
        id,
        eventId,
      },
    });
  }
  update(eventId: string, id: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spots.update({
      where: {
        id,
        eventId,
      },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, id: string) {
    return this.prismaService.spots.delete({ where: { id, eventId } });
  }
}
