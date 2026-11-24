import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { Hero } from "@/components/home/hero";
import { NewProjects } from "@/components/home/new-projects";
import { OwnerCta } from "@/components/home/owner-cta";
import { PropertyCategories } from "@/components/home/property-categories";
import { PopularCities } from "@/components/home/popular-cities";
import { QuickDiscovery } from "@/components/home/quick-discovery";
import { WhyIndiaBrix } from "@/components/home/why-indiabrix";

type SearchParams = Record<string, string | string[] | undefined>;

function serializeSearchParams(searchParams: SearchParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const entry of value) params.append(key, entry);
    } else if (value) {
      params.set(key, value);
    }
  }
  return params.toString();
}

async function SearchAwareHero({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const initialSearchParams = serializeSearchParams(await searchParams);
  return <Hero initialSearchParams={initialSearchParams} />;
}

export default function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <SiteHeader />
      <main>
        <Suspense fallback={<Hero initialSearchParams="" />}>
          <SearchAwareHero searchParams={searchParams} />
        </Suspense>
        <QuickDiscovery />
        <FeaturedProperties />
        <PopularCities />
        <NewProjects />
        <PropertyCategories />
        <OwnerCta />
        <WhyIndiaBrix />
      </main>
      <SiteFooter />
    </>
  );
}
