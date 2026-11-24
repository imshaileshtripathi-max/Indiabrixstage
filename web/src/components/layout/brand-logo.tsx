import Image from "next/image";

type BrandLogoProps = {
  variant?: "light" | "dark";
};

export function BrandLogo({ variant = "light" }: BrandLogoProps) {
  const isDark = variant === "dark";

  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        alt=""
        aria-hidden="true"
        className="size-10 shrink-0 drop-shadow-[0_3px_8px_rgba(23,59,101,0.16)]"
        height={40}
        src={`/indiabrix-logo-${variant}.svg`}
        width={40}
      />
      <span className="text-left">
        <span
          className={`block text-xl font-extrabold leading-none tracking-tight ${
            isDark ? "text-white" : "text-[#173B65]"
          }`}
        >
          India<span className={isDark ? "text-[#4EEDB8]" : "text-[#0C9B87]"}>brix</span>
        </span>
        <span
          className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-wider ${
            isDark ? "text-white/65" : "text-[#5E6A78]"
          }`}
        >
          Real Estate Marketplace
        </span>
      </span>
    </span>
  );
}
