import { apiFetch } from "./client";
import type { ApiDecompositionGetResponse } from "./models/decomposition-get-response";

export function decompositionGet(text: string): Promise<ApiDecompositionGetResponse> {
  return apiFetch<ApiDecompositionGetResponse>(`/decomposition/${text}`);
}
