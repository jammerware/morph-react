import { apiFetch } from "./client";
import type { ApiTranslateAllPostResponse } from "./models/translate-all-post-response";
import type { ApiTranslateGetResponse } from "./models/translate-get-response";

export function translatePost(text: string): Promise<ApiTranslateGetResponse> {
  return apiFetch<ApiTranslateGetResponse>(`/translate/${text}`);
}

export function translateAllPost(request: { text: string[] }): Promise<ApiTranslateAllPostResponse> {
  return apiFetch<ApiTranslateAllPostResponse>(`/translate/all`, {
    method: "POST",
    body: JSON.stringify(request),
  });
}