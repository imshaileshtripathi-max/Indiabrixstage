"use client";

import { Search } from "lucide-react";
import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AdvancedPropertyFilters } from "@/components/home/advanced-property-filters";
import { QuickPropertyFilters } from "@/components/home/quick-property-filters";
import {
  type SelectedFilterChip,
  SelectedFilterChips,
} from "@/components/home/selected-filter-chips";
import { SearchSuggestionsPanel } from "@/components/home/search-suggestions-panel";
import { localDemoSearchProvider } from "@/services/search/local-demo-search-provider";
import {
  advancedFilterGroups,
  searchModes,
  type TransactionMode,
} from "@/services/search/search-config";
import type { SearchSuggestion } from "@/services/search/search-suggestions";
import {
  buildSearchUrl,
  isValidIndianPinCode,
} from "@/services/search/search-url";

function getAdvancedFilterKeys(mode: TransactionMode) {
  return new Set(
    advancedFilterGroups[mode].flatMap((group) =>
      group.fields.map((field) => field.key),
    ),
  );
}

function getSelectedChips(
  mode: TransactionMode,
  values: Record<string, string>,
  selectedSuggestion: SearchSuggestion | null,
): SelectedFilterChip[] {
  const chips: SelectedFilterChip[] = [];
  if (selectedSuggestion) {
    const categoryLabel =
      selectedSuggestion.category === "Cities"
        ? "City"
        : selectedSuggestion.category === "Localities"
          ? "Locality"
          : selectedSuggestion.category === "Projects"
            ? "Project"
            : "";
    if (categoryLabel) {
      chips.push({
        key: "selectedPlace",
        label: `${categoryLabel}: ${selectedSuggestion.label}`,
      });
    }
  }

  if (values.propertyType) {
    chips.push({ key: "propertyType", label: `Type: ${values.propertyType}` });
  }
  const placeSuggestionSelected =
    selectedSuggestion?.category === "Cities" ||
    selectedSuggestion?.category === "Localities";
  if (values.location && !placeSuggestionSelected) {
    chips.push({ key: "location", label: `Location: ${values.location}` });
  }
  if (values.pinCode) {
    chips.push({ key: "pinCode", label: `PIN code: ${values.pinCode}` });
  }

  const formatBudget = (value: string) => {
    const amount = Number(value);
    return value && Number.isFinite(amount)
      ? `₹${amount.toLocaleString("en-IN")}`
      : value || "Any";
  };
  if (values.minBudget || values.maxBudget) {
    const unit =
      mode === "Rent" ||
      mode === "PG & Co-living" ||
      (mode === "Commercial" && values.commercialListingType === "Rent")
        ? " / month"
        : "";
    chips.push({
      key: "budget",
      label: `Budget: ${formatBudget(values.minBudget)}–${formatBudget(values.maxBudget)}${unit}`,
    });
  }

  if (values.bedrooms) {
    chips.push({ key: "bedrooms", label: values.bedrooms });
  }

  if (values.minArea || values.maxArea) {
    chips.push({
      key: "area",
      label: `Area: ${values.minArea || "Any"}–${values.maxArea || "Any"} sq ft`,
    });
  }

  const advancedKeys = getAdvancedFilterKeys(mode);
  const advancedLabels = new Map(
    advancedFilterGroups[mode].flatMap((group) =>
      group.fields.map((field) => [field.key, field.label] as const),
    ),
  );
  for (const [key, value] of Object.entries(values)) {
    if (key === "minArea" || key === "maxArea") continue;
    const label = advancedLabels.get(key);
    if (advancedKeys.has(key) && value && label) {
      chips.push({
        key,
        label: value === "Yes" ? label : `${label}: ${value}`,
      });
    }
  }

  return chips;
}

function getInitialSearchState(search: string) {
  const params = new URLSearchParams(search);
  const requestedMode = params.get("transaction") ?? params.get("mode") ?? "";
  const mode =
    searchModes.find(
      (item) => item.toLowerCase().replace(/[&\s]+/g, "-") === requestedMode,
    ) ?? "Buy";
  const filters: Record<string, string> = {};

  for (const [key, value] of params) {
    if (key === "type") {
      filters.propertyType = value;
    } else if (
      !["q", "transaction", "mode", "city", "locality", "project"].includes(
        key,
      )
    ) {
      filters[key] = value;
    }
  }

  const location =
    params.get("location") ?? params.get("locality") ?? params.get("city");
  if (location) filters.location = location;

  return { mode, query: params.get("q") ?? "", filters };
}

export function PropertySearch({
  initialSearchParams,
}: {
  initialSearchParams: string;
}) {
  const [initialState] = useState(() =>
    getInitialSearchState(initialSearchParams),
  );
  const [mode, setMode] = useState<TransactionMode>(initialState.mode);
  const [query, setQuery] = useState(initialState.query);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestionQuery, setSuggestionQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<SearchSuggestion | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [suggestionError, setSuggestionError] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>(
    initialState.filters,
  );
  const [draftAdvancedFilters, setDraftAdvancedFilters] = useState<
    Record<string, string>
  >(initialState.filters);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [validationError, setValidationError] = useState("");
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const timeout = window.setTimeout(
      () => setDebouncedQuery(trimmedQuery),
      250,
    );
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) return;

    let active = true;
    localDemoSearchProvider
      .suggest(debouncedQuery)
      .then((results) => {
        if (active) {
          setSuggestions(results);
          setSuggestionQuery(debouncedQuery);
          setSuggestionError(false);
          setActiveIndex(-1);
        }
      })
      .catch(() => {
        if (active) {
          setSuggestions([]);
          setSuggestionQuery(debouncedQuery);
          setSuggestionError(true);
        }
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function handleOutsidePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !autocompleteRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, []);

  useEffect(() => {
    if (!isAdvancedOpen) return;

    function handleAdvancedKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setIsAdvancedOpen(false);
    }
    function handleAdvancedPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !searchPanelRef.current?.contains(event.target)
      ) {
        setIsAdvancedOpen(false);
      }
    }

    document.addEventListener("keydown", handleAdvancedKeyDown);
    document.addEventListener("pointerdown", handleAdvancedPointerDown);
    return () => {
      document.removeEventListener("keydown", handleAdvancedKeyDown);
      document.removeEventListener("pointerdown", handleAdvancedPointerDown);
    };
  }, [isAdvancedOpen]);

  useEffect(() => {
    if (activeIndex >= 0) {
      document
        .getElementById(`property-suggestion-${activeIndex}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  function clearSearchState() {
    setQuery("");
    setDebouncedQuery("");
    setSuggestionQuery("");
    setSuggestions([]);
    setSuggestionError(false);
    setIsOpen(false);
    setActiveIndex(-1);
    setSelectedSuggestion(null);
  }

  function chooseSuggestion(suggestion: SearchSuggestion) {
    setQuery(suggestion.label);
    setSelectedSuggestion(suggestion);
    if (suggestion.category === "Property Types") {
      setFilters((current) => ({
        ...current,
        propertyType: suggestion.label,
      }));
    } else if (
      suggestion.category === "Cities" ||
      suggestion.category === "Localities"
    ) {
      setFilters((current) => ({ ...current, location: suggestion.label }));
    }
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (!isOpen || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index <= 0 ? suggestions.length : index) - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      chooseSuggestion(suggestions[activeIndex]);
    }
  }

  function handleModeChange(nextMode: TransactionMode) {
    setMode(nextMode);
    setFilters({});
    setDraftAdvancedFilters({});
    setSelectedSuggestion(null);
    setIsAdvancedOpen(false);
    setValidationError("");
  }

  function handleFilterChange(key: string, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
    if (key === "pinCode" || key === "minBudget" || key === "maxBudget") {
      setValidationError("");
    }
    if (key === "location") setSelectedSuggestion(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (filters.pinCode && !isValidIndianPinCode(filters.pinCode)) {
      setValidationError("Enter a valid six-digit Indian PIN code.");
      return;
    }
    if (
      filters.minBudget &&
      filters.maxBudget &&
      Number(filters.minBudget) > Number(filters.maxBudget)
    ) {
      setValidationError(
        "Maximum budget must be greater than or equal to minimum budget.",
      );
      return;
    }
    setValidationError("");
    setIsOpen(false);
    router.push(
      buildSearchUrl({
        mode,
        query,
        suggestion: selectedSuggestion,
        values: filters,
      }),
    );
  }

  function toggleAdvancedFilters() {
    if (isAdvancedOpen) {
      setIsAdvancedOpen(false);
      return;
    }

    setIsOpen(false);
    setIsAdvancedOpen(true);
  }

  function handleApplyAdvanced() {
    setFilters((current) => ({ ...current, ...draftAdvancedFilters }));
    setIsAdvancedOpen(false);
  }

  function clearAllFilters() {
    setFilters({});
    setDraftAdvancedFilters({});
    setSelectedSuggestion(null);
    setIsAdvancedOpen(false);
    setValidationError("");
  }

  function removeFilter(key: string) {
    const keysToRemove =
      key === "budget"
        ? ["minBudget", "maxBudget"]
        : key === "area"
          ? ["minArea", "maxArea"]
          : [key];
    setFilters((current) => {
      const next = { ...current };
      for (const filterKey of keysToRemove) delete next[filterKey];
      return next;
    });
    setDraftAdvancedFilters((current) => {
      const next = { ...current };
      for (const filterKey of keysToRemove) delete next[filterKey];
      return next;
    });
    if (key === "selectedPlace") setSelectedSuggestion(null);
  }

  const meaningfulQuery = query.trim().length >= 2;
  const waitingForDebounce = query.trim() !== debouncedQuery;
  const isLoading =
    waitingForDebounce ||
    (Boolean(debouncedQuery) && debouncedQuery !== suggestionQuery);
  const selectedChips = getSelectedChips(mode, filters, selectedSuggestion);
  const advancedFilterCount = Object.entries({
    ...filters,
    ...draftAdvancedFilters,
  }).filter(
    ([key, value]) => getAdvancedFilterKeys(mode).has(key) && Boolean(value),
  ).length;

  return (
    <div
      className="relative z-20 rounded-2xl border border-white/80 bg-white p-3 shadow-[0_24px_70px_rgba(9,28,58,0.28)] sm:p-4"
      ref={searchPanelRef}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div
          aria-label="Choose what you are looking for"
          className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-[#ECFDF5] p-1"
          role="group"
        >
          {searchModes.map((item) => (
            <button
              aria-pressed={mode === item}
              className={`focus-ring min-h-11 shrink-0 rounded-lg px-1 text-xs font-extrabold transition min-[400px]:px-3 sm:px-4 sm:text-sm ${
                mode === item
                  ? "bg-[#d6fcf4] text-[#173B65] shadow-[0_4px_12px_rgba(12,155,135,0.12)]"
                  : "text-[#173B65] hover:bg-white"
              }`}
              key={item}
              onClick={() => handleModeChange(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <span className="shrink-0 text-[0.625rem] font-semibold text-[#5E6A78] sm:text-xs">
          Demo data
        </span>
      </div>

      <form action="/search" method="get" onSubmit={handleSubmit}>
        <input
          name="transaction"
          type="hidden"
          value={mode.toLowerCase().replace(/[&\s]+/g, "-")}
        />
        <div className="relative flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 flex-1" ref={autocompleteRef}>
            <label className="sr-only" htmlFor="property-search-query">
              Search by city, locality, project or property description
            </label>
            <div className="flex min-h-[52px] items-center gap-2.5 rounded-xl border border-[#99F6E4] bg-[#F8FAFC] px-3 transition focus-within:border-[#0C9B87] focus-within:ring-2 focus-within:ring-[#0C9B87]/10 sm:px-4">
              <Search
                aria-hidden="true"
                className="shrink-0 text-[#0C9B87]"
                size={19}
              />
              <input
                aria-activedescendant={
                  isOpen && activeIndex >= 0
                    ? `property-suggestion-${activeIndex}`
                    : undefined
                }
                aria-autocomplete="list"
                aria-controls="property-search-suggestions"
                aria-expanded={isOpen && meaningfulQuery}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-base font-semibold text-[#173B65] outline-none placeholder:font-normal placeholder:text-[#5E6A78]"
                id="property-search-query"
                name="q"
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  setQuery(nextQuery);
                  setSelectedSuggestion(null);
                  setIsAdvancedOpen(false);
                  setIsOpen(nextQuery.trim().length >= 2);
                  setActiveIndex(-1);
                  if (nextQuery.trim().length < 2) {
                    setDebouncedQuery("");
                    setSuggestionQuery("");
                    setSuggestions([]);
                    setSuggestionError(false);
                  }
                }}
                onFocus={() => {
                  setIsAdvancedOpen(false);
                  if (meaningfulQuery) setIsOpen(true);
                }}
                onPointerDown={() => {
                  if (meaningfulQuery) setIsOpen(true);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search city, locality, project or describe the property you want..."
                ref={inputRef}
                role="combobox"
                type="text"
                value={query}
              />
              {query && (
                <button
                  aria-label="Clear search text"
                  className="focus-ring flex size-9 shrink-0 items-center justify-center rounded-full text-[#52605F] hover:bg-[#CCFBF1] hover:text-[#0C9B87]"
                  onClick={clearSearchState}
                  type="button"
                >
                  <span aria-hidden="true" className="text-xl leading-none">
                    ×
                  </span>
                </button>
              )}
            </div>

            {isOpen && meaningfulQuery && (
              <SearchSuggestionsPanel
                activeIndex={activeIndex}
                hasError={suggestionError}
                isLoading={isLoading}
                onChoose={chooseSuggestion}
                onHighlight={setActiveIndex}
                query={query}
                suggestions={suggestions}
              />
            )}
          </div>
          <button
            className="focus-ring inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0C9B87] px-5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(12,155,135,0.2)] transition hover:bg-[#097868] sm:min-w-[180px]"
            type="submit"
          >
            <Search aria-hidden="true" size={17} />
            Search Properties
          </button>
        </div>

        <QuickPropertyFilters
          advancedFilterCount={advancedFilterCount}
          isAdvancedOpen={isAdvancedOpen}
          mode={mode}
          onChange={handleFilterChange}
          onToggleAdvanced={toggleAdvancedFilters}
          values={filters}
        />
        {validationError && (
          <p
            aria-live="polite"
            className="mt-2 text-sm font-semibold text-[#B42318]"
            role="alert"
          >
            {validationError}
          </p>
        )}
      </form>

      <SelectedFilterChips
        chips={selectedChips}
        onClearAll={clearAllFilters}
        onRemove={removeFilter}
      />

      <div
        aria-hidden={!isAdvancedOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isAdvancedOpen ? "opacity-100" : "opacity-0"
        }`}
        id="advanced-property-filters"
        style={{ gridTemplateRows: isAdvancedOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden" inert={!isAdvancedOpen}>
          <AdvancedPropertyFilters
            mode={mode}
            onApply={handleApplyAdvanced}
            onChange={(key, value) =>
              setDraftAdvancedFilters((current) => ({
                ...current,
                [key]: value,
              }))
            }
            onClearAll={clearAllFilters}
            onClose={() => setIsAdvancedOpen(false)}
            values={draftAdvancedFilters}
          />
        </div>
      </div>
    </div>
  );
}
