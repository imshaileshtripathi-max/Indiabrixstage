import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

function SearchResultsLoading() {
  return (
    <main aria-live="polite" className="min-h-[65vh] bg-[#F8FAFC] py-12">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[#E5EAF0] bg-white p-6 text-sm text-[#52605F]">
          Loading sample search results…
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[65vh] bg-[#F8FAFC]">
        <Suspense fallback={<SearchResultsLoading />}>
          <SearchResults />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
