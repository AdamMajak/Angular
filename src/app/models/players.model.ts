import { Quest } from './quests.model';
import { Clan } from './clans.model';

export interface Player {
  id: number;
  nickname: string;
  level: number;
  clan?: Clan;
  quests: Quest[];
  avatarUrl?: string;
}
