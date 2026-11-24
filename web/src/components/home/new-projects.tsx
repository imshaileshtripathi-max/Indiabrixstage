import { ArrowRight, MapPin } from "lucide-react";
import { newProjectDemos } from "@/data/homepage";
import { ResponsiveImage } from "@/components/ui/responsive-image";

export function NewProjects() {
  return (
    <section className="section-space" id="projects">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Illustrative developer projects</p>
            <h2 className="section-title mt-3">New projects. Fresh beginnings.</h2>
            <p className="section-copy mt-3">
              Explore residential and commercial project examples. Names,
              locations and indicative prices are fictional demo content.
            </p>
          </div>
          <a
            className="focus-ring inline-flex shrink-0 items-center gap-2 self-start rounded-lg text-sm font-bold text-[#0C9B87] hover:text-[#173B65] sm:self-auto"
            href="#categories"
          >
            Browse property categories
            <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {newProjectDemos.map((project) => (
            <article
              className="group overflow-hidden rounded-2xl border border-[#E5EAF0] bg-white shadow-[0_8px_24px_rgba(23,59,101,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,59,101,0.11)] md:flex"
              key={project.name}
            >
              <ResponsiveImage
                alt={project.imageDescription}
                className="relative aspect-[1.65/1] min-h-[220px] md:aspect-auto md:min-h-[290px] md:w-[42%] md:shrink-0"
                sizes="(max-width: 767px) 100vw, 42vw"
                src={project.image}
              />
              <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                <span className="self-start rounded-full border border-[#E5EAF0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-bold text-[#5E6A78]">
                  Demo project
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-[-0.035em] text-[#173B65]">
                  {project.name}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#5E6A78]">
                  <MapPin aria-hidden="true" size={15} />
                  {project.location}
                </p>
                <p className="mt-4 text-sm text-[#52605F]">{project.detail}</p>
                <p className="mt-2 text-base font-bold text-[#0C9B87]">
                  {project.price}
                </p>
                <p className="mt-4 text-sm leading-5 text-[#5E6A78]">
                  Illustrative sample only; not a real or available
                  development.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
