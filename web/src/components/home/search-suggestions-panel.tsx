import {
  Building2,
  House,
  MapPin,
  Search,
  Tag,
} from "lucide-react";
import {
  type SearchSuggestion,
  type SuggestionCategory,
} from "@/services/search/search-suggestions";

const categories: SuggestionCategory[] = [
  "Cities",
  "Localities",
  "Projects",
  "Property Searches",
  "Property Types",
];

const categoryIcons = {
  Cities: MapPin,
  Localities: MapPin,
  Projects: Building2,
  "Property Searches": Search,
  "Property Types": House,
};

function HighlightedMatch({ label, query }: { label: string; query: string }) {
  const normalizedLabel = label.toLowerCase();
  const matches = query
    .trim()
    .split(/\s+/)
    .map((word) => ({
      word,
      index: normalizedLabel.indexOf(word.toLowerCase()),
    }))
    .filter(({ word, index }) => word.length > 0 && index >= 0)
    .sort((left, right) => left.index - right.index);
  const match = matches[0];
  if (!match) return label;

  return (
    <>
      {label.slice(0, match.index)}
      <strong className="font-extrabold text-[#0C9B87]">
        {label.slice(match.index, match.index + match.word.length)}
      </strong>
      {label.slice(match.index + match.word.length)}
    </>
  );
}

type SearchSuggestionsPanelProps = {
  query: string;
  suggestions: SearchSuggestion[];
  activeIndex: number;
  isLoading: boolean;
  hasError: boolean;
  onChoose: (suggestion: SearchSuggestion) => void;
  onHighlight: (index: number) => void;
};

export function SearchSuggestionsPanel({
  query,
  suggestions,
  activeIndex,
  isLoading,
  hasError,
  onChoose,
  onHighlight,
}: SearchSuggestionsPanelProps) {
  if (!query.trim()) return null;

  return (
    <div
      aria-label="Local demo property search suggestions"
      className="absolute inset-x-0 top-full z-40 mt-2 max-h-[min(60vh,24rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[#CCFBF1] bg-white p-2 shadow-[0_20px_52px_rgba(23,59,101,0.2)]"
      id="property-search-suggestions"
      role="listbox"
    >
      {isLoading ? (
        <p aria-live="polite" className="px-4 py-3 text-sm text-[#52605F]">
          Finding matching demo suggestions…
        </p>
      ) : hasError ? (
        <p aria-live="polite" className="px-4 py-3 text-sm text-[#52605F]">
          Suggestions couldn’t be loaded. Press Enter to search your phrase.
        </p>
      ) : suggestions.length === 0 ? (
        <p
          aria-live="polite"
          className="px-4 py-3 text-sm leading-6 text-[#52605F]"
        >
          No local demo suggestions match. Press Enter to search this phrase.
        </p>
      ) : (
        categories.map((category) => {
          const groupSuggestions = suggestions
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => item.category === category);
          if (groupSuggestions.length === 0) return null;
          const Icon = categoryIcons[category];

          return (
            <div aria-label={category} key={category} role="group">
              <p className="px-3 pb-1 pt-2 text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-[#5E6A78]">
                {category}
              </p>
              {groupSuggestions.map(({ item, index }) => (
                <button
                  aria-selected={activeIndex === index}
                  className={`focus-ring flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-1.5 text-left text-sm font-semibold text-[#1B2633] transition hover:bg-[#ECFDF5] ${
                    activeIndex === index ? "bg-[#F0FDFA]" : ""
                  }`}
                  id={`property-suggestion-${index}`}
                  key={item.id}
                  onClick={() => onChoose(item)}
                  onPointerMove={() => onHighlight(index)}
                  role="option"
                  type="button"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F0FDFA] text-[#0C9B87]">
                    <Icon aria-hidden="true" size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">
                      <HighlightedMatch label={item.label} query={query} />
                    </span>
                    {item.detail && (
                      <span className="block truncate text-xs font-medium text-[#5E6A78]">
                        <HighlightedMatch label={item.detail} query={query} />
                      </span>
                    )}
                  </span>
                  {category === "Property Searches" && (
                    <Tag
                      aria-hidden="true"
                      className="shrink-0 text-[#9aa6b7]"
                      size={15}
                    />
                  )}
                </button>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
