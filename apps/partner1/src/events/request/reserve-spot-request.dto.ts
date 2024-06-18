import { TicketKind } from '@prisma/client';

export class ReserveSpotRequestDto {
  spots: string[];
  ticket_kind: TicketKind;
  email: string;
}
