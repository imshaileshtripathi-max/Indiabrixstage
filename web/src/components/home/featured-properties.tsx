import {
  ArrowRight,
  Bath,
  BedDouble,
  MapPin,
  Ruler,
} from "lucide-react";
import { featuredProperties } from "@/data/homepage";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { ResponsiveImage } from "@/components/ui/responsive-image";

function PropertyDetails({
  bedrooms,
  bathrooms,
  area,
}: {
  bedrooms: number;
  bathrooms: number;
  area: string;
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-[#52605F]">
      <span className="inline-flex items-center gap-1">
        <BedDouble aria-hidden="true" size={14} />
        {bedrooms} beds
      </span>
      <span className="inline-flex items-center gap-1">
        <Bath aria-hidden="true" size={14} />
        {bathrooms} baths
      </span>
      <span className="inline-flex items-center gap-1">
        <Ruler aria-hidden="true" size={14} />
        {area}
      </span>
    </div>
  );
}

export function FeaturedProperties() {
  return (
    <section className="section-space" id="featured">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Illustrative demo listings</p>
            <h2 className="section-title mt-3">
              Featured homes for what comes next
            </h2>
            <p className="section-copy mt-3">
              Explore sample homes across India. Every listing, photo, price
              and detail below is illustrative demo content.
            </p>
          </div>
          <a
            className="focus-ring inline-flex shrink-0 items-center gap-2 self-start rounded-lg text-sm font-bold text-[#0C9B87] hover:text-[#173B65] sm:self-auto"
            href="#categories"
          >
            Explore property types
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <article
              className="group overflow-hidden rounded-2xl border border-[#E5EAF0] bg-white shadow-[0_8px_24px_rgba(23,59,101,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,59,101,0.12)]"
              key={property.title}
            >
              <div className="relative aspect-[1.62/1] overflow-hidden bg-[#CCFBF1]">
                <ResponsiveImage
                  alt={property.imageDescription}
                  className="absolute inset-0"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  src={property.image}
                />
                <div className="absolute inset-x-0 top-0 z-[1] flex items-start justify-between p-4">
                  <span className="rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#52605F] shadow-sm">
                    Demo listing
                  </span>
                  <FavoriteButton label={property.title} />
                </div>
                <span className="absolute bottom-4 left-4 z-[1] rounded-full bg-[#173B65]/90 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
                  {property.category}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-2xl font-bold tracking-[-0.035em] text-[#173B65]">
                  {property.price}
                </p>
                <h3 className="mt-2 min-h-12 text-[1.0625rem] font-bold leading-6 text-[#1B2633]">
                  {property.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm leading-5 text-[#52605F]">
                  <MapPin aria-hidden="true" className="shrink-0" size={15} />
                  {property.location}
                </p>
                <div className="mt-4 flex flex-col gap-3 border-t border-[#E5EAF0] pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2">
                  <span className="rounded-lg bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold text-[#52605F]">
                    {property.propertyType}
                  </span>
                  <PropertyDetails
                    area={property.area}
                    bathrooms={property.bathrooms}
                    bedrooms={property.bedrooms}
                  />
                </div>
                <details className="mt-4 border-t border-[#E5EAF0] pt-4">
                  <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between rounded-md text-sm font-bold text-[#0C9B87] [&::-webkit-details-marker]:hidden md:min-h-0">
                    View details
                    <ArrowRight aria-hidden="true" size={17} />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#52605F]">
                    {property.overview}
                  </p>
                </details>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-[#5E6A78]" id="demo-listing-note">
          All homes, prices and details are illustrative demo content. Listings
          are not verified and availability is not live.
        </p>
      </div>
    </section>
  );
}
