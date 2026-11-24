import { ArrowRight, Building2, Sparkles } from "lucide-react";

export function OwnerCta() {
  return (
    <section className="pb-20 sm:pb-24" id="owners">
      <div className="page-shell">
        <div className="relative isolate overflow-hidden rounded-2xl bg-[#173B65] px-6 py-10 shadow-[0_20px_48px_rgba(23,59,101,0.16)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_92%_5%,rgba(78,237,184,0.44),transparent_35%),linear-gradient(115deg,#173B65_20%,#204C7E_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-14 -top-28 -z-10 size-72 rounded-full border border-white/10 sm:right-12 sm:size-96"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-[#CCFBF1]">
                <Sparkles aria-hidden="true" size={14} />
                For owners & builders
              </span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.05em] text-white">
                Have a property to sell or rent?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#CCFBF1]/85 sm:text-base">
                IndiaBrix is creating space for owners and developers to share
                what they’re building. Get in touch as the marketplace takes
                shape.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row lg:min-w-[220px] lg:flex-col">
              <a
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#0C9B87] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#F0FDFA]"
                href="#footer"
              >
                List Your Property
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <a
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                href="#footer"
              >
                <Building2 aria-hidden="true" size={17} />
                Builder enquiries
              </a>
            </div>
          </div>
          <p className="relative mt-6 text-xs text-[#CCFBF1]/65">
            Owner and developer enquiry channels are coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
