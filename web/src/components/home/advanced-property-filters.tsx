import { X } from "lucide-react";
import {
  advancedFilterGroups,
  type TransactionMode,
} from "@/services/search/search-config";

type AdvancedPropertyFiltersProps = {
  mode: TransactionMode;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onApply: () => void;
  onClearAll: () => void;
  onClose: () => void;
};

export function AdvancedPropertyFilters({
  mode,
  values,
  onChange,
  onApply,
  onClearAll,
  onClose,
}: AdvancedPropertyFiltersProps) {
  return (
    <section
      aria-label="More property filters"
      className="mt-3 w-full min-w-0 rounded-2xl border border-[#CCFBF1] bg-[#F8FAFC] p-3 sm:p-4"
      role="region"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-extrabold text-[#173B65]">
            Advanced search
          </h3>
          <p className="mt-0.5 text-xs text-[#5E6A78]">
            Optional preferences · demo filters only
          </p>
        </div>
        <button
          aria-label="Collapse advanced filters"
          className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-xl text-[#52605F] hover:bg-white hover:text-[#0C9B87]"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" size={18} />
        </button>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {advancedFilterGroups[mode].map((group) => (
          <fieldset
            className="min-w-0 rounded-xl border border-[#E5EAF0] bg-white p-3 sm:p-4"
            key={group.label}
          >
            <legend className="px-1 text-sm font-extrabold text-[#52605F]">
              {group.label}
            </legend>
            <div className="grid min-w-0 gap-3 lg:grid-cols-2">
              {group.fields.map((field) => (
                <label
                  className={`min-w-0 ${
                    field.kind === "checkbox"
                      ? "flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-[#52605F]"
                      : "block"
                  }`}
                  key={field.key}
                >
                  {field.kind === "checkbox" ? (
                    <>
                      <input
                        checked={Boolean(values[field.key])}
                        className="size-4 accent-[#0C9B87]"
                        onChange={(event) =>
                          onChange(
                            field.key,
                            event.target.checked ? "Yes" : "",
                          )
                        }
                        type="checkbox"
                      />
                      {field.label}
                    </>
                  ) : (
                    <>
                      <span className="mb-1.5 block text-sm font-bold text-[#52605F]">
                        {field.label}
                      </span>
                      {field.kind === "select" ? (
                        <select
                          className="h-11 w-full min-w-0 rounded-lg border border-[#E5EAF0] bg-white px-3 text-sm text-[#173B65] outline-none focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
                          onChange={(event) =>
                            onChange(field.key, event.target.value)
                          }
                          value={values[field.key] ?? ""}
                        >
                          <option value="">Any</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="h-11 w-full min-w-0 rounded-lg border border-[#E5EAF0] bg-white px-3 text-sm text-[#173B65] outline-none placeholder:text-[#9AA6B7] focus:border-[#0C9B87] focus:ring-2 focus:ring-[#0C9B87]/10"
                          min={field.kind === "number" ? "0" : undefined}
                          onChange={(event) =>
                            onChange(field.key, event.target.value)
                          }
                          placeholder={field.placeholder}
                          type={
                            field.kind === "date"
                              ? "date"
                              : field.kind === "number"
                                ? "number"
                                : "text"
                          }
                          value={values[field.key] ?? ""}
                        />
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="sticky bottom-0 z-[1] mt-3 flex flex-col-reverse gap-2 border-t border-[#E5EAF0] bg-[#F8FAFC] pt-3 sm:flex-row sm:justify-end">
        <button
          className="focus-ring min-h-11 rounded-xl px-4 text-sm font-bold text-[#52605F] hover:bg-white"
          onClick={onClearAll}
          type="button"
        >
          Clear All
        </button>
        <button
          className="focus-ring min-h-11 rounded-xl bg-[#0C9B87] px-5 text-sm font-bold text-white hover:bg-[#097868]"
          onClick={onApply}
          type="button"
        >
          Apply Filters
        </button>
      </div>
    </section>
  );
}
