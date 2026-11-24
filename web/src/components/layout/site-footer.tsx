import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Buy a home", href: "/#featured" },
      { label: "Rent a home", href: "/#featured" },
      { label: "Commercial spaces", href: "/#projects" },
      { label: "New projects", href: "/#projects" },
    ],
  },
  {
    title: "Property types",
    links: [
      { label: "Apartments & houses", href: "/#categories" },
      { label: "Villas & plots", href: "/#categories" },
      { label: "Office spaces", href: "/#categories" },
      { label: "Retail & warehouses", href: "/#categories" },
    ],
  },
  {
    title: "IndiaBrix",
    links: [
      { label: "Why IndiaBrix", href: "/#why-indiabrix" },
      { label: "Popular cities", href: "/#cities" },
      { label: "List your property", href: "/#owners" },
      { label: "Builder enquiries", href: "/#owners" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#173B65] text-white" id="footer">
      <div className="page-shell py-12 sm:py-14">
        <div className="grid gap-9 border-b border-white/12 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Link
              aria-label="IndiaBrix home"
              className="focus-ring inline-flex rounded-xl"
              href="/#top"
            >
              <BrandLogo variant="dark" />
            </Link>
            <p className="mt-4 text-sm font-semibold text-white/90">
              Find Your Space. Build Your Future.
            </p>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">
              A more thoughtful way to find the place for your next chapter.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-bold text-white">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="focus-ring flex min-h-11 items-center rounded px-1 text-[0.9375rem] text-white/70 transition-colors hover:text-white md:min-h-0 md:px-0 md:text-sm"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-bold text-white">Get in touch</h2>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Contact details coming soon.
            </p>
            <p className="mt-3 text-xs leading-5 text-white/55">
              Account access and contact services are not active in this
              preview.
            </p>
            <p className="mt-4 text-xs text-white/55">
              Social channels coming soon.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/55">
            © IndiaBrix. Development preview.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-white/55">
            Demo experience · Listings and project details are illustrative
            <ArrowUpRight aria-hidden="true" size={13} />
          </p>
        </div>
      </div>
    </footer>
  );
}
