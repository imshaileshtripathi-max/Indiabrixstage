import {
  ArrowUpRight,
  Briefcase,
  Building2,
  House,
  Landmark,
  MapPin,
  Store,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { propertyCategories } from "@/data/homepage";

const categoryIcons: Record<
  (typeof propertyCategories)[number]["icon"],
  LucideIcon
> = {
  apartment: Building2,
  house: House,
  villa: Landmark,
  plot: MapPin,
  office: Briefcase,
  retail: Store,
  warehouse: Warehouse,
};

export function PropertyCategories() {
  return (
    <section className="section-space bg-white" id="categories">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Find the right kind of space</p>
          <h2 className="section-title mt-3">Explore property categories</h2>
          <p className="section-copy mt-3">
            Browse residential and commercial spaces. Category links are part
            of this preview and do not filter live inventory.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {propertyCategories.map((category) => {
            const Icon = categoryIcons[category.icon];
            const isCommercial = ["Office Spaces", "Retail Shops", "Warehouses"].includes(
              category.name,
            );

            return (
              <a
                className="focus-ring group flex min-h-[148px] flex-col rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-4 transition hover:border-[#99F6E4] hover:shadow-[0_12px_28px_rgba(23,59,101,0.07)] sm:min-h-[168px] sm:p-5"
                href={isCommercial ? "#projects" : "#featured"}
                key={category.name}
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#CCFBF1] text-[#0C9B87]">
                  <Icon aria-hidden="true" size={21} />
                </span>
                <span className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#173B65] sm:text-base">
                    {category.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="shrink-0 text-[#0C9B87]"
                    size={16}
                  />
                </span>
                <span className="mt-1 text-xs leading-5 text-[#5E6A78] sm:text-sm">
                  {category.description}
                </span>
              </a>
            );
          })}
        </div>
        <p className="mt-4 text-center text-sm text-[#5E6A78]">
          Categories are illustrative discovery links, not live search filters.
        </p>
      </div>
    </section>
  );
}
