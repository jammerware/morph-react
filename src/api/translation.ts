import { apiFetch } from "./client";
import type { ApiTranslateGetResponse } from "./models/translate-get-response";

export function translatePost(text: string): Promise<ApiTranslateGetResponse> {
  return apiFetch<ApiTranslateGetResponse>(`/translate/${text}`);
}
