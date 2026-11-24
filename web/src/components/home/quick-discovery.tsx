import {
  ArrowUpRight,
  Building2,
  Clock3,
  Compass,
  KeyRound,
  Sparkles,
} from "lucide-react";

const shortcuts = [
  {
    icon: KeyRound,
    title: "Owner properties",
    description: "Owner listing features coming soon",
    href: "#owners",
  },
  {
    icon: Sparkles,
    title: "Verification features",
    description: "Coming soon — listings are not verified",
    href: "#why-indiabrix",
  },
  {
    icon: Building2,
    title: "New projects",
    description: "Browse illustrative project previews",
    href: "#projects",
  },
  {
    icon: Clock3,
    title: "Ready to move",
    description: "Browse illustrative home examples",
    href: "#featured",
  },
  {
    icon: Compass,
    title: "Residential",
    description: "Find a home for your next chapter",
    href: "#featured",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Discover workspace possibilities",
    href: "#categories",
  },
];

export function QuickDiscovery() {
  return (
    <section aria-label="Quick discovery" className="bg-white py-8 sm:py-10">
      <div className="page-shell">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Start exploring</p>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.035em] text-[#173B65] sm:text-2xl">
              Discover your options
            </h2>
          </div>
          <span className="hidden items-center gap-1 text-sm font-medium text-[#5E6A78] sm:inline-flex">
            IndiaBrix preview
            <ArrowUpRight aria-hidden="true" size={15} />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {shortcuts.map(({ icon: Icon, title, description, href }) => (
            <a
              className="focus-ring group rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-4 transition hover:border-[#99F6E4] hover:bg-[#F0FDFA] sm:p-5"
              href={href}
              key={title}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#0C9B87] shadow-sm">
                <Icon aria-hidden="true" size={19} />
              </span>
              <h3 className="mt-4 text-sm font-bold text-[#173B65] sm:text-base">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5E6A78] sm:text-sm">
                {description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
