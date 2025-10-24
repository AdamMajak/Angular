import { Player } from './players.model';

export interface Clan {
  id: number;
  name: string;
  description: string;
  capacity: number;
  members: Player[];
  avatarUrl?: string;
}
