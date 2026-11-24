import { newProjectDemos } from "@/data/homepage";
import { propertyTypes } from "@/services/search/search-config";
import {
  getSearchSuggestions,
  type SearchSuggestion,
} from "@/services/search/search-suggestions";

export type SearchProvider = {
  suggest(query: string): Promise<SearchSuggestion[]>;
};

export const localDemoSearchProvider: SearchProvider = {
  async suggest(query) {
    return getSearchSuggestions(
      query,
      newProjectDemos,
      [...new Set(Object.values(propertyTypes).flat())],
    );
  },
};
