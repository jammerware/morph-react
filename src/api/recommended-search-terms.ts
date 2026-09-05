import { apiFetch } from "./client";

export function recommendedSearchTermsGet(): Promise<string[]> {
  return apiFetch("/recommended-search-terms");
}
