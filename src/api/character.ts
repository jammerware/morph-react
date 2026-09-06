import { apiFetch } from "./client";
import { type ApiCharacter } from "./models/character";

export default function characterGet(character: string) {
  return apiFetch<ApiCharacter>(`/character/${character}`);
}
