import { Suspense } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AuthPanel } from "@/components/auth/auth-panel";

type AccountPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

async function AccountContent({
  searchParams,
}: AccountPageProps) {
  const { mode } = await searchParams;
  const initialMode = mode === "signup" ? "signup" : "login";

  return (
    <div className="mx-auto max-w-lg">
      <Link
        className="text-sm font-bold text-[#0c9b87] hover:text-[#097868]"
        href="/"
      >
        &larr; Back to IndiaBrix
      </Link>
      <AuthPanel initialMode={initialMode} />
    </div>
  );
}

export default function AccountPage(props: AccountPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="page-shell min-h-[65vh] py-10 sm:py-16">
        <Suspense
          fallback={
            <p className="mx-auto max-w-lg text-center text-sm text-[#5E6A78]">
              Loading account...
            </p>
          }
        >
          <AccountContent searchParams={props.searchParams} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
