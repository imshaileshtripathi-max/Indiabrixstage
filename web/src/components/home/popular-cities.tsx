import { ArrowUpRight } from "lucide-react";
import { popularCities } from "@/data/homepage";
import { ResponsiveImage } from "@/components/ui/responsive-image";

export function PopularCities() {
  return (
    <section className="section-space bg-white" id="cities">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">A city that feels like yours</p>
          <h2 className="section-title mt-3">Find your place in the city</h2>
          <p className="section-copy mt-3">
            From coastal energy to a quieter corner, explore eight vibrant
            destinations. City imagery is illustrative, not live inventory.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {popularCities.map((city) => (
            <a
              className="focus-ring group relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-[#F0FDFA] shadow-[0_8px_24px_rgba(23,59,101,0.08)] sm:aspect-square lg:aspect-[1.15/1]"
              href="#featured"
              key={city.name}
            >
              <ResponsiveImage
                alt={`${city.name} cityscape, illustrative image`}
                className="absolute inset-0"
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                src={city.image}
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#173B65]/85 via-[#173B65]/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-[2] p-4 text-white sm:p-5">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold tracking-[-0.035em] sm:text-xl">
                      {city.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/80">{city.note}</p>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur transition group-hover:bg-white group-hover:text-[#0C9B87]">
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-[#5E6A78]">
          Illustrative city imagery; no property counts or live inventory shown.
        </p>
      </div>
    </section>
  );
}
