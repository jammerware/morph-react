import type { ApiCharacter } from "./character";
import type { ApiWord } from "./word";

export interface ApiDecompositionGetResponse {
  characters: ApiCharacter[];
  word: ApiWord;
}
