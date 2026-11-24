import Image from "next/image";
import { Sparkles } from "lucide-react";
import { PropertySearch } from "@/components/home/property-search";

export function Hero({ initialSearchParams }: { initialSearchParams: string }) {
  return (
    <section
      className="relative isolate overflow-visible bg-[#173B65]"
      id="top"
    >
      <Image
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover object-center opacity-25"
        fill
        priority
        sizes="100vw"
        src="/images/indiabrix-hero.jpg"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#173B65] via-[#173B65]/80 to-[#173B65]/60"
      />

      <div className="page-shell flex flex-col gap-6 py-8 sm:gap-8 sm:py-10 lg:min-h-[520px] lg:justify-between lg:gap-6 lg:py-8">
        <div className="mx-auto w-full text-center text-white">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-[#4EEDB8]/40 bg-white/10 px-3.5 py-2 text-xs font-bold tracking-wide text-[#4EEDB8] backdrop-blur-sm">
            <Sparkles aria-hidden="true" className="shrink-0 text-[#4EEDB8]" size={14} />
            A more thoughtful way to find your space
          </p>
          <h1 className="mt-3 whitespace-nowrap text-[clamp(1rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.055em]">
            Find Your Space. Build Your Future.
          </h1>
          <p className="mt-2 mx-auto max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            Discover homes, commercial properties and new projects across
            India.
          </p>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <PropertySearch
            initialSearchParams={initialSearchParams}
            key={initialSearchParams}
          />
        </div>
      </div>
    </section>
  );
}
