import type { TransactionMode } from "@/services/search/search-config";
import type { SearchSuggestion } from "@/services/search/search-suggestions";

export type SearchFilters = {
  mode: TransactionMode;
  query: string;
  suggestion?: SearchSuggestion | null;
  values: Record<string, string>;
};

export function isValidIndianPinCode(value: string) {
  return /^\d{6}$/.test(value);
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-|-$/g, "");
}

export function buildSearchUrl({ mode, query, suggestion, values }: SearchFilters) {
  const params = new URLSearchParams();
  params.set("transaction", slugify(mode));

  const optionalFilters: [string, string][] = [
    ["q", query],
    ["location", values.location ?? ""],
    ["pinCode", values.pinCode ?? ""],
    ["type", values.propertyType ?? ""],
    ["minBudget", values.minBudget ?? ""],
    ["maxBudget", values.maxBudget ?? ""],
    ["bedrooms", values.bedrooms ?? ""],
    ["minArea", values.minArea ?? ""],
    ["maxArea", values.maxArea ?? ""],
  ];

  if (suggestion?.category === "Cities") {
    optionalFilters.push(["city", slugify(suggestion.label)]);
  } else if (suggestion?.category === "Localities") {
    optionalFilters.push(["locality", slugify(suggestion.label)]);
  } else if (suggestion?.category === "Projects") {
    optionalFilters.push(["project", suggestion.label]);
  }

  for (const [key, value] of Object.entries(values)) {
    if (
      ![
        "propertyType",
        "location",
        "pinCode",
        "minBudget",
        "maxBudget",
        "bedrooms",
        "minArea",
        "maxArea",
      ].includes(key)
    ) {
      optionalFilters.push([key, value]);
    }
  }

  for (const [name, rawValue] of optionalFilters) {
    const value = rawValue.trim();
    if (value) params.set(name, value);
  }

  return `/search?${params.toString()}`;
}
