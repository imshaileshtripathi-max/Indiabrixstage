export type SuggestionCategory =
  | "Cities"
  | "Localities"
  | "Projects"
  | "Property Searches"
  | "Property Types";

export type SearchSuggestion = {
  id: string;
  label: string;
  category: SuggestionCategory;
  searchableText: string;
  detail?: string;
};

export type SearchProject = {
  name: string;
  location: string;
  detail: string;
};

const cities = [
  ["Mumbai", "Maharashtra"],
  ["Delhi", "Delhi NCR"],
  ["Gurugram", "Haryana"],
  ["Noida", "Uttar Pradesh"],
  ["Bengaluru", "Karnataka"],
  ["Hyderabad", "Telangana"],
  ["Pune", "Maharashtra"],
  ["Chennai", "Tamil Nadu"],
  ["Kolkata", "West Bengal"],
  ["Ahmedabad", "Gujarat"],
  ["Jaipur", "Rajasthan"],
  ["Lucknow", "Uttar Pradesh"],
  ["Kochi", "Kerala"],
  ["Chandigarh", "Chandigarh"],
  ["Indore", "Madhya Pradesh"],
  ["Surat", "Gujarat"],
  ["Nagpur", "Maharashtra"],
  ["Coimbatore", "Tamil Nadu"],
] as const;

const localities = [
  ["Sector 65 Gurugram", "Gurugram"],
  ["Golf Course Road", "Gurugram"],
  ["Dwarka", "Delhi"],
  ["Whitefield", "Bengaluru"],
  ["Electronic City", "Bengaluru"],
  ["Hinjewadi", "Pune"],
  ["Powai", "Mumbai"],
  ["Sector 62", "Noida"],
  ["Gachibowli", "Hyderabad"],
  ["Adyar", "Chennai"],
  ["Salt Lake", "Kolkata"],
  ["Bopal", "Ahmedabad"],
  ["Vaishali Nagar", "Jaipur"],
] as const;

const propertySearches = [
  "2 BHK flats in Gurugram",
  "3 BHK apartments in Noida",
  "Villas in Bengaluru",
  "Residential plots in Pune",
  "Commercial office spaces in Mumbai",
  "Rental apartments in Hyderabad",
  "3 BHK apartment in Gurugram under 1.5 crore",
  "3 BHK flat in Noida under 1.5 crore",
  "Villa near Golf Course Road",
  "Office space for rent in Bengaluru",
  "Warehouse in Mumbai",
  "Residential plot in Pune",
];

function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .trim();
}

function matchesQuery(query: string, searchableText: string) {
  const queryWords = normalize(query).split(/\s+/).filter(Boolean);
  if (queryWords.length === 0) return false;

  const searchableWords = normalize(searchableText).split(/\s+/);
  return queryWords.every((queryWord) =>
    searchableWords.some((word) => word.startsWith(queryWord)),
  );
}

function suggestion(
  id: string,
  label: string,
  category: SuggestionCategory,
  searchableText: string,
  detail?: string,
): SearchSuggestion {
  return { id, label, category, searchableText, detail };
}

export function getSearchSuggestions(
  query: string,
  projects: SearchProject[] = [],
  propertyTypes: string[] = [],
): SearchSuggestion[] {
  const citySuggestions = cities.map(([name, region]) =>
    suggestion(`city-${name}`, name, "Cities", `${name} ${region}`),
  );
  const localitySuggestions = localities.map(([name, city]) =>
    suggestion(
      `locality-${name}`,
      name,
      "Localities",
      `${name} ${city} ${city} India`,
    ),
  );
  const projectSuggestions = projects.map((project) =>
    suggestion(
      `project-${project.name}`,
      project.name,
      "Projects",
      `${project.name} ${project.location} ${project.detail}`,
      `${project.location} · Local demo project`,
    ),
  );
  const propertySearchSuggestions = propertySearches.map((label, index) =>
    suggestion(`search-${index}`, label, "Property Searches", label),
  );
  const propertyTypeSuggestions = propertyTypes.map((label) =>
    suggestion(
      `type-${label}`,
      label,
      "Property Types",
      `${label} residential commercial property type`,
    ),
  );

  return [
    ...citySuggestions,
    ...localitySuggestions,
    ...projectSuggestions,
    ...propertySearchSuggestions,
    ...propertyTypeSuggestions,
  ]
    .filter((item) => matchesQuery(query, `${item.label} ${item.searchableText}`))
    .slice(0, 12);
}
