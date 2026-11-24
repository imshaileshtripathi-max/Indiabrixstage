import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  propertyTypes,
  type TransactionMode,
} from "@/services/search/search-config";

type QuickPropertyFiltersProps = {
  mode: TransactionMode;
  values: Record<string, string>;
  advancedFilterCount: number;
  isAdvancedOpen: boolean;
  onChange: (key: string, value: string) => void;
  onToggleAdvanced: () => void;
};

function BudgetRange({
  mode,
  values,
  onChange,
}: {
  mode: TransactionMode;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">
        {mode === "Rent" ||
        mode === "PG & Co-living" ||
        (mode === "Commercial" && values.commercialListingType === "Rent")
          ? "Monthly rent (₹)"
          : "Budget (₹)"}
      </legend>
      <div className="flex h-11 items-center rounded-xl border border-[#E5EAF0] bg-white px-2">
        <label className="sr-only" htmlFor="budget-min">
          Minimum budget
        </label>
        <input
          className="w-full min-w-0 bg-transparent px-1 text-sm font-semibold text-[#173B65] outline-none placeholder:font-normal placeholder:text-[#9AA6B7]"
          id="budget-min"
          inputMode="numeric"
          min="0"
          name="minBudget"
          onChange={(event) => onChange("minBudget", event.target.value)}
          placeholder="Min"
          type="number"
          value={values.minBudget ?? ""}
        />
        <span aria-hidden="true" className="px-1 text-xs text-[#9AA6B7]">
          –
        </span>
        <label className="sr-only" htmlFor="budget-max">
          Maximum budget
        </label>
        <input
          className="w-full min-w-0 bg-transparent px-1 text-sm font-semibold text-[#173B65] outline-none placeholder:font-normal placeholder:text-[#9AA6B7]"
          id="budget-max"
          inputMode="numeric"
          min="0"
          name="maxBudget"
          onChange={(event) => onChange("maxBudget", event.target.value)}
          placeholder="Max"
          type="number"
          value={values.maxBudget ?? ""}
        />
      </div>
    </fieldset>
  );
}

export function QuickPropertyFilters({
  mode,
  values,
  advancedFilterCount,
  isAdvancedOpen,
  onChange,
  onToggleAdvanced,
}: QuickPropertyFiltersProps) {
  const hasBedrooms = ["Buy", "Rent", "New Projects"].includes(mode);

  return (
    <div className="mt-2 grid grid-cols-2 items-end gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <label className="relative min-w-0">
        <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">
          Property type
        </span>
        <select
          className="h-11 w-full appearance-none rounded-xl border border-[#E5EAF0] bg-white px-3 pr-7 text-sm font-semibold text-[#173B65] outline-none focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
          name="type"
          onChange={(event) => onChange("propertyType", event.target.value)}
          value={values.propertyType ?? ""}
        >
          <option value="">Any type</option>
          {values.propertyType &&
            !propertyTypes[mode].includes(values.propertyType) && (
              <option value={values.propertyType}>{values.propertyType}</option>
            )}
          {propertyTypes[mode].map((propertyType) => (
            <option key={propertyType} value={propertyType}>
              {propertyType}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 right-2.5 text-[#5E6A78]"
          size={14}
        />
      </label>

      <BudgetRange mode={mode} onChange={onChange} values={values} />

      {hasBedrooms && (
        <label className="relative min-w-0">
          <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">
            Bedrooms
          </span>
          <select
            className="h-11 w-full appearance-none rounded-xl border border-[#E5EAF0] bg-white px-3 pr-7 text-sm font-semibold text-[#173B65] outline-none focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
            name="bedrooms"
            onChange={(event) => onChange("bedrooms", event.target.value)}
            value={values.bedrooms ?? ""}
          >
            <option value="">Any</option>
            {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bedroom) => (
              <option key={bedroom} value={bedroom}>
                {bedroom}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 right-2.5 text-[#5E6A78]"
            size={14}
          />
        </label>
      )}

      <label className="min-w-0">
        <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">
          Location
        </span>
        <input
          autoComplete="address-level2"
          className="h-11 w-full min-w-0 rounded-xl border border-[#E5EAF0] bg-white px-3 text-sm font-semibold text-[#173B65] outline-none placeholder:font-normal placeholder:text-[#9AA6B7] focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
          name="location"
          onChange={(event) => onChange("location", event.target.value)}
          placeholder="City, locality, sector"
          type="text"
          value={values.location ?? ""}
        />
      </label>

      <label className="min-w-0">
        <span className="mb-1 block text-[0.625rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">
          PIN code
        </span>
        <input
          autoComplete="postal-code"
          className="h-11 w-full min-w-0 rounded-xl border border-[#E5EAF0] bg-white px-3 text-sm font-semibold text-[#173B65] outline-none placeholder:font-normal placeholder:text-[#9AA6B7] focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
          inputMode="numeric"
          maxLength={6}
          name="pinCode"
          onChange={(event) =>
            onChange("pinCode", event.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="e.g. 122002"
          type="text"
          value={values.pinCode ?? ""}
        />
      </label>

      <button
        aria-expanded={isAdvancedOpen}
        aria-controls="advanced-property-filters"
        className="focus-ring col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#99F6E4] bg-[#F8FAFC] px-3 text-sm font-bold text-[#0C9B87] transition hover:bg-[#F0FDFA] sm:col-span-1"
        onClick={onToggleAdvanced}
        type="button"
      >
        <SlidersHorizontal aria-hidden="true" size={15} />
        {isAdvancedOpen ? "Hide Filters" : "Advanced Filters"}
        {advancedFilterCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-[#0C9B87] text-[0.6875rem] text-white">
            {advancedFilterCount}
          </span>
        )}
      </button>
    </div>
  );
}
