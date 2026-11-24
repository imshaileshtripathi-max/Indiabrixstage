"use client";

import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { featuredProperties } from "@/data/homepage";

const PAGE_SIZE = 2;

function firstValue(value: string | null) {
  return value?.trim() ?? "";
}

function formatFilterLabel(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^(.)/, (letter) => letter.toUpperCase());
}

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const [sort, setSort] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeFilters = useMemo(
    () =>
      Array.from(params.entries()).filter(
        ([key, value]) =>
          value &&
          !["transaction", "mode", "q"].includes(key),
      ),
    [params],
  );

  const query = firstValue(params.get("q")).toLowerCase();
  const location =
    firstValue(params.get("location")) ||
    firstValue(params.get("city")) ||
    firstValue(params.get("locality"));
  const propertyType =
    firstValue(params.get("type")) ||
    firstValue(params.get("propertyType"));

  const matches = useMemo(() => {
    return featuredProperties.filter((property) => {
      const searchable = [
        property.title,
        property.location,
        property.propertyType,
        property.category,
      ].join(" ").toLowerCase();
      if (query && !searchable.includes(query) && query.split(/\s+/).some((word) => !searchable.includes(word))) {
        return false;
      }
      if (location && !property.location.toLowerCase().includes(location.toLowerCase().replace(/-/g, " "))) {
        return false;
      }
      if (propertyType && !property.propertyType.toLowerCase().includes(propertyType.toLowerCase().replace(/\/.*$/, "").trim())) {
        return false;
      }
      return true;
    });
  }, [location, propertyType, query]);

  const sortedMatches = useMemo(() => {
    const copy = [...matches];
    if (sort === "price-low") {
      copy.sort((a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")));
    } else if (sort === "price-high") {
      copy.sort((a, b) => Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, "")));
    }
    return copy;
  }, [matches, sort]);

  function removeFilter(key: string) {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    setVisibleCount(PAGE_SIZE);
    router.push(`/search${next.toString() ? `?${next.toString()}` : ""}`);
  }

  function clearFilters() {
    const next = new URLSearchParams();
    const transaction = params.get("transaction");
    if (transaction) next.set("transaction", transaction);
    router.push(`/search${next.toString() ? `?${next.toString()}` : ""}`);
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="page-shell">
        <div className="flex flex-col gap-4 border-b border-[#E5EAF0] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Sample search results</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#173B65] sm:text-4xl">
              {query ? `Results for “${query}”` : "Explore sample properties"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#5E6A78]">
              Illustrative listings only — sample data is not live availability.
            </p>
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm font-bold text-[#52605F]">
            Sort
            <select
              className="h-11 rounded-xl border border-[#E5EAF0] bg-white px-3 text-sm text-[#173B65] outline-none focus:border-[#0C9B87]"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              <option value="featured">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {activeFilters.map(([key, value]) => (
              <button
                className="focus-ring inline-flex min-h-9 items-center gap-2 rounded-full border border-[#CCFBF1] bg-[#F0FDFA] px-3 text-xs font-bold text-[#173B65] hover:border-[#4EEDB8]"
                key={key}
                onClick={() => removeFilter(key)}
                type="button"
              >
                {formatFilterLabel(key)}: {value}
                <span aria-hidden="true" className="text-base leading-none">×</span>
              </button>
            ))}
            <button
              className="focus-ring min-h-9 px-2 text-xs font-bold text-[#0C9B87] hover:text-[#173B65]"
              onClick={clearFilters}
              type="button"
            >
              Clear all
            </button>
          </div>
        )}

        {sortedMatches.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#E5EAF0] bg-white p-6 text-center shadow-[0_12px_34px_rgba(23,59,101,0.07)] sm:p-10">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0C9B87]">
              <Search aria-hidden="true" size={22} />
            </span>
            <h2 className="mt-4 text-xl font-bold text-[#173B65]">No matching demo listings</h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#5E6A78]">
              Try a different city, property type or budget. Sample results currently cover Bengaluru, Mumbai and Gurugram.
            </p>
            <button
              className="focus-ring mt-5 min-h-11 rounded-xl bg-[#0C9B87] px-5 text-sm font-bold text-white hover:bg-[#097868]"
              onClick={clearFilters}
              type="button"
            >
              Clear search filters
            </button>
          </div>
        ) : (
          <>
            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
              {sortedMatches.slice(0, visibleCount).map((property) => (
                <article className="overflow-hidden rounded-2xl border border-[#E5EAF0] bg-white shadow-[0_8px_24px_rgba(23,59,101,0.055)]" key={property.title}>
                  <div className="relative aspect-[1.62/1] overflow-hidden bg-[#CCFBF1]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={property.imageDescription} className="h-full w-full object-cover" src={property.image} />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#52605F]">Demo listing</span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-2xl font-bold text-[#173B65]">{property.price}</p>
                    <h2 className="mt-2 text-lg font-bold text-[#1B2633]">{property.title}</h2>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-[#52605F]"><MapPin aria-hidden="true" size={15} />{property.location}</p>
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-[#E5EAF0] pt-4 text-sm font-medium text-[#52605F]">
                      <span className="inline-flex items-center gap-1"><BedDouble aria-hidden="true" size={14} />{property.bedrooms} beds</span>
                      <span className="inline-flex items-center gap-1"><Bath aria-hidden="true" size={14} />{property.bathrooms} baths</span>
                      <span className="inline-flex items-center gap-1"><Ruler aria-hidden="true" size={14} />{property.area}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < sortedMatches.length && (
              <div className="mt-7 text-center">
                <button
                  className="focus-ring min-h-11 rounded-xl border border-[#99F6E4] bg-white px-5 text-sm font-bold text-[#0C9B87] hover:bg-[#F0FDFA]"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  type="button"
                >
                  Load more demo listings
                </button>
              </div>
            )}
          </>
        )}
        <Link className="focus-ring mt-8 inline-flex min-h-11 items-center rounded-xl border border-[#E5EAF0] bg-white px-5 text-sm font-bold text-[#173B65] hover:border-[#4EEDB8]" href="/#top">
          Back to search
        </Link>
      </div>
    </section>
  );
}
