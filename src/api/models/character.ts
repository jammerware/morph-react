import type { ApiSemanticRadical } from "./semantic-radical";

export interface ApiCharacter {
  character: string;
  freqRank: number;
  pinyin: string;
  definitions: string[];
  semanticRadical: ApiSemanticRadical;
  strokeCount: number;
  isUnbound: boolean;
  commonWords: { word: string; frequency: number }[];
}
