import {
  ArrowUpRight,
  Compass,
  Heart,
  Info,
  MessagesSquare,
  Search,
} from "lucide-react";

const reasons = [
  {
    icon: Search,
    title: "Clear property discovery",
    description:
      "A simple starting point for the home, rental or workspace that fits your next move.",
  },
  {
    icon: Compass,
    title: "A thoughtful experience",
    description:
      "A considered, easy-to-navigate journey that keeps the focus on finding your space.",
  },
  {
    icon: Info,
    title: "Useful information",
    description:
      "Room for the details that help you explore each possibility with more clarity.",
  },
  {
    icon: MessagesSquare,
    title: "Better connections",
    description:
      "A marketplace designed to bring property seekers and professionals closer together.",
  },
];

export function WhyIndiaBrix() {
  return (
    <section className="section-space overflow-hidden bg-[#F0FDFA]" id="why-indiabrix">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div className="relative">
            <div className="absolute -left-16 -top-20 -z-0 size-48 rounded-full bg-[#CCFBF1]" />
            <div className="relative">
              <p className="eyebrow">The IndiaBrix difference</p>
              <h2 className="section-title mt-3 max-w-md">
                Finding a space should feel like a fresh start.
              </h2>
              <p className="section-copy mt-4">
                Every move is personal. We’re shaping a marketplace to make
                exploring what’s next feel more clear, useful and human.
              </p>
              <a
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[#0C9B87] transition hover:gap-3"
                href="#featured"
              >
                Explore the preview
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#CCFBF1] bg-white/80 p-4 sm:max-w-sm lg:mt-12">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#0C9B87]">
                <Heart aria-hidden="true" size={18} />
              </span>
              <p className="text-xs leading-5 text-[#52605F]">
                Built around the idea that your next space should feel like
                yours from day one.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {reasons.map(({ icon: Icon, title, description }, index) => (
              <article
                className={`group rounded-2xl border border-[#CCFBF1] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#99F6E4] hover:shadow-[0_16px_34px_rgba(23,59,101,0.08)] sm:p-6 ${
                  index === 0 || index === 3 ? "bg-white" : "bg-white/65"
                }`}
                key={title}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0C9B87] transition group-hover:bg-[#0C9B87] group-hover:text-white">
                  <Icon aria-hidden="true" size={21} />
                </span>
                <h3 className="mt-5 text-base font-bold tracking-[-0.02em] text-[#173B65]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5E6A78]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
