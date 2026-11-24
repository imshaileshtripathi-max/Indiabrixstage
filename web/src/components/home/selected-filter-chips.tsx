import { X } from "lucide-react";

export type SelectedFilterChip = {
  key: string;
  label: string;
};

export function SelectedFilterChips({
  chips,
  onRemove,
  onClearAll,
}: {
  chips: SelectedFilterChip[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}) {
  if (chips.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-[#E5EAF0] pt-2">
      {chips.map((chip) => (
        <span
          className="inline-flex min-h-7 max-w-full items-center gap-1 rounded-full border border-[#CCFBF1] bg-[#F8FAFC] py-0.5 pl-2.5 pr-1 text-xs font-medium text-[#52605F]"
          key={chip.key}
        >
          <span className="truncate">{chip.label}</span>
          <button
            aria-label={`Remove ${chip.label} filter`}
            className="focus-ring flex size-6 shrink-0 items-center justify-center rounded-full text-[#5E6A78] hover:bg-[#ECFDF5] hover:text-[#0C9B87]"
            onClick={() => onRemove(chip.key)}
            type="button"
          >
            <X aria-hidden="true" size={13} />
          </button>
        </span>
      ))}
      <button
        className="focus-ring min-h-8 rounded px-2 text-xs font-bold text-[#0C9B87] hover:bg-[#ECFDF5]"
        onClick={onClearAll}
        type="button"
      >
        Clear All
      </button>
    </div>
  );
}
