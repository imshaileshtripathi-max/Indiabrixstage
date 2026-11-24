"use client";

import {
  ArrowUpRight,
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  Calculator,
  ChevronDown,
  ClipboardList,
  Crown,
  Heart,
  House,
  KeyRound,
  Landmark,
  LogIn,
  MapPin,
  Menu,
  Scale,
  ShieldCheck,
  Star,
  Store,
  UserRound,
  UserPlus,
  UsersRound,
  Warehouse,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { buildSearchUrl } from "@/services/search/search-url";
import type { TransactionMode } from "@/services/search/search-config";

type SearchMenuOption = {
  label: string;
  mode: TransactionMode;
  group: string;
  description: string;
  values?: Record<string, string>;
  badge?: string;
};

type NavigationItem = {
  label: string;
  href?: string;
  description?: string;
  badge?: string;
  comingSoon?: boolean;
  group?: string;
};

type NavigationMenu = {
  label: string;
  items: NavigationItem[];
  badge?: string;
  columns?: 1 | 2;
  kind?: "services";
  icon?: LucideIcon;
};

function searchHref({
  mode,
  values = {},
}: Pick<SearchMenuOption, "mode" | "values">) {
  return buildSearchUrl({ mode, query: "", values });
}

function createSearchMenu(
  label: string,
  options: SearchMenuOption[],
): NavigationMenu {
  return {
    label,
    columns: 2,
    items: options.map((option) => ({
      label: option.label,
      description: option.description,
      badge: option.badge,
      group: option.group,
      href: searchHref(option),
    })),
  };
}

const primaryMenus: NavigationMenu[] = [
  { ...createSearchMenu("Buy", [
    { label: "Apartments / Flats", group: "Residential", description: "Explore apartments and flats for sale.", mode: "Buy", values: { propertyType: "Apartment / Flat" } },
    { label: "Independent Houses", group: "Residential", description: "Search independent homes for sale.", mode: "Buy", values: { propertyType: "Independent House" } },
    { label: "Villas", group: "Residential", description: "Explore villas for sale.", mode: "Buy", values: { propertyType: "Villa" } },
    { label: "Plots / Land", group: "Residential", description: "Browse residential plots and land.", mode: "Plots", values: { propertyType: "Residential Plot" } },
    { label: "Commercial Properties", group: "Commercial", description: "Search commercial property for sale.", mode: "Commercial", values: { commercialListingType: "Sale" } },
    { label: "Office Spaces", group: "Commercial", description: "Find commercial offices for sale.", mode: "Commercial", values: { propertyType: "Office Space", commercialListingType: "Sale" } },
    { label: "Retail Shops", group: "Commercial", description: "Explore shops and retail spaces for sale.", mode: "Commercial", values: { propertyType: "Retail Shop", commercialListingType: "Sale" } },
    { label: "Warehouses", group: "Commercial", description: "Search warehouses for sale.", mode: "Commercial", values: { propertyType: "Warehouse", commercialListingType: "Sale" } },
  ]), icon: House },
  { ...createSearchMenu("Rent", [
    { label: "Apartments / Flats", group: "Residential", description: "Find apartments and flats for rent.", mode: "Rent", values: { propertyType: "Apartment / Flat" } },
    { label: "Independent Houses", group: "Residential", description: "Search houses available for rent.", mode: "Rent", values: { propertyType: "Independent House" } },
    { label: "Villas", group: "Residential", description: "Explore villas for rent.", mode: "Rent", values: { propertyType: "Villa" } },
    { label: "Commercial Spaces", group: "Commercial", description: "Search commercial spaces for rent.", mode: "Commercial", values: { commercialListingType: "Rent" } },
    { label: "Office Spaces", group: "Commercial", description: "Find offices for rent or lease.", mode: "Commercial", values: { propertyType: "Office Space", commercialListingType: "Rent" } },
    { label: "Shops", group: "Commercial", description: "Explore retail shops for rent.", mode: "Commercial", values: { propertyType: "Retail Shop", commercialListingType: "Rent" } },
    { label: "Warehouses", group: "Commercial", description: "Search warehouses for rent.", mode: "Commercial", values: { propertyType: "Warehouse", commercialListingType: "Rent" } },
  ]), icon: KeyRound },
  {
    ...createSearchMenu("New Projects", [
    { label: "All New Projects", group: "Explore projects", description: "Browse project previews in the demo.", mode: "New Projects" },
    { label: "RERA Registration", group: "Explore projects", description: "Filter for projects with a RERA number provided.", mode: "New Projects", values: { reraStatus: "Number provided" }, badge: "RERA filter" },
    { label: "Under Construction", group: "Project status", description: "Filter projects by construction status.", mode: "New Projects", values: { projectStatus: "Under construction" } },
    { label: "Ready to Move", group: "Project status", description: "Filter projects marked ready to move.", mode: "New Projects", values: { projectStatus: "Ready to move" } },
    { label: "Residential Projects", group: "Project type", description: "Explore residential project previews.", mode: "New Projects", values: { propertyType: "Apartment / Flat" } },
    { label: "Commercial Projects", group: "Project type", description: "Explore commercial project previews.", mode: "New Projects", values: { propertyType: "Commercial" } },
    { label: "Projects by City", group: "Project type", description: "Choose a city in the search form.", mode: "New Projects" },
    ]),
    badge: "RERA",
    icon: Building2,
  },
  {
    ...createSearchMenu("PG", [
    { label: "PG for Men", group: "Find a stay", description: "Search accommodation with this preference.", mode: "PG & Co-living", values: { genderPreference: "Men" } },
    { label: "PG for Women", group: "Find a stay", description: "Search accommodation with this preference.", mode: "PG & Co-living", values: { genderPreference: "Women" } },
    { label: "Co-living Spaces", group: "Find a stay", description: "Browse co-living search options.", mode: "PG & Co-living", values: { propertyType: "Co-living Space" }, badge: "Coliving" },
    { label: "Single Sharing", group: "Sharing", description: "Filter for single occupancy.", mode: "PG & Co-living", values: { sharingType: "Single" } },
    { label: "Double Sharing", group: "Sharing", description: "Filter for double sharing.", mode: "PG & Co-living", values: { sharingType: "Double" } },
    { label: "Triple Sharing", group: "Sharing", description: "Filter for triple sharing.", mode: "PG & Co-living", values: { sharingType: "Triple" } },
    { label: "Fully Furnished PG", group: "Amenities", description: "Filter for furnished accommodation.", mode: "PG & Co-living", values: { propertyType: "Fully Furnished PG" } },
    { label: "PG with Meals", group: "Amenities", description: "Filter for accommodation with meals.", mode: "PG & Co-living", values: { meals: "Included" } },
    ]),
    badge: "Coliving",
    icon: UsersRound,
  },
  {
    label: "Top Agents",
    badge: "Verified",
    icon: ShieldCheck,
    items: [
      { label: "Find Verified Agents", description: "Agent verification is not available in this preview.", badge: "Coming soon", comingSoon: true },
      { label: "Top Rated Agents", description: "Agent ratings are not available in this preview.", comingSoon: true },
      { label: "Agents by City", description: "Agent directory is not available in this preview.", comingSoon: true },
      { label: "Residential Property Agents", description: "Agent directory is not available in this preview.", comingSoon: true },
      { label: "Commercial Property Agents", description: "Agent directory is not available in this preview.", comingSoon: true },
      { label: "Become a Partner / Register as an Agent", description: "Partner registration is not available yet.", comingSoon: true },
    ],
  },
  {
    label: "Pricing",
    icon: Crown,
    items: [
      { label: "Owner / Individual Plans", description: "Approved plan details are not available yet.", comingSoon: true },
      { label: "Agent / Broker Plans", description: "Approved plan details are not available yet.", comingSoon: true },
      { label: "Builder / Developer Plans", description: "Approved plan details are not available yet.", comingSoon: true },
      { label: "Featured Property Packages", description: "Package details are not available yet.", comingSoon: true },
      { label: "Lead Generation Packages", description: "Package details are not available yet.", comingSoon: true },
      { label: "Compare Plans", description: "Plan comparison is not available yet.", comingSoon: true },
      { label: "Pricing FAQs", description: "Pricing information is not available yet.", comingSoon: true },
    ],
  },
  {
    label: "Reviews",
    badge: "Genuine",
    icon: Star,
    items: [
      { label: "Read Property Reviews", description: "Browse demo buyer and tenant feedback.", comingSoon: true },
      { label: "Write a Property Review", description: "Review submission is not active in this preview.", badge: "8-Step", comingSoon: true },
      { label: "Verified Buyer Reviews", description: "Live buyer verification is not connected.", comingSoon: true },
      { label: "Verified Tenant Reviews", description: "Live tenant verification is not connected.", comingSoon: true },
      { label: "Top Rated Properties", description: "Resident ratings are not live in this demo.", comingSoon: true },
    ],
  },
  {
    label: "Services",
    kind: "services",
    icon: Wrench,
    items: [
      { label: "Interior / Exterior Works", description: "Modular kitchens, false ceilings and turnkey decor.", comingSoon: true },
      { label: "Construction Contractors", description: "Civil construction, RCC foundations and waterproofing.", comingSoon: true },
      { label: "Suppliers", description: "Cement, TMT steel, tiles and sanitaryware.", comingSoon: true },
      { label: "Become a Partner", description: "Channel partner, contractor and vendor enquiries.", badge: "Join", comingSoon: true },
      { label: "Property Reviews", description: "Read and share verified property reviews.", comingSoon: true },
      { label: "Saved", description: "Saved properties require account features that are not active.", comingSoon: true, group: "My tools & activity" },
      { label: "Compare", description: "Property comparison is not available in this preview.", comingSoon: true, group: "My tools & activity" },
      { label: "Alerts", description: "Search alerts are not available in this preview.", comingSoon: true, group: "My tools & activity" },
    ],
  },
];

function getMenuIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  if (normalized.includes("villa") || normalized.includes("land")) return Landmark;
  if (normalized.includes("house") || normalized.includes("home")) return House;
  if (normalized.includes("plot") || normalized.includes("city")) return MapPin;
  if (normalized.includes("shop") || normalized.includes("supplier")) return Store;
  if (normalized.includes("warehouse")) return Warehouse;
  if (normalized.includes("rera") || normalized.includes("verified")) return ShieldCheck;
  if (normalized.includes("agent") || normalized.includes("partner")) return UserRound;
  if (normalized.includes("commercial") || normalized.includes("construction")) return Briefcase;
  if (normalized.includes("rent") || normalized.includes("sell")) return KeyRound;
  if (normalized.includes("review") || normalized.includes("rated")) return Star;
  if (normalized.includes("calculator")) return Calculator;
  if (normalized.includes("saved")) return Bookmark;
  if (normalized.includes("compare")) return Scale;
  if (normalized.includes("alert")) return Bell;
  if (normalized.includes("loan") || normalized.includes("emi")) return Calculator;
  if (normalized.includes("interior") || normalized.includes("exterior")) return Wrench;
  if (normalized.includes("project")) return Building2;
  if (normalized.includes("sharing") || normalized.includes("pg")) return UsersRound;
  if (normalized.includes("pricing") || normalized.includes("plan")) return ClipboardList;
  return Building2;
}

function MenuItems({
  items,
  mobile = false,
  columns = 2,
  onSelect,
}: {
  items: NavigationItem[];
  mobile?: boolean;
  columns?: 1 | 2;
  onSelect: () => void;
}) {
  const groups = [...new Set(items.map((item) => item.group).filter(Boolean))];
  const ungrouped = items.filter((item) => !item.group);

  function renderItems(groupItems: NavigationItem[]) {
    return groupItems.map((item) => {
      const Icon = getMenuIcon(item.label);
      const className = `focus-ring flex min-h-12 items-start gap-2.5 rounded-lg px-3 py-2 text-left ${
        item.comingSoon
          ? "text-[#5E6A78]"
          : "text-[#1B2633] transition-colors hover:bg-[#d6fcf4] hover:text-[#173B65]"
      }`;

      return (
        <li key={item.label}>
          {item.href ? (
            <Link className={className} href={item.href} onClick={onSelect}>
              <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-[#0c9b87]" size={17} strokeWidth={1.8} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 text-sm font-bold">
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-[#d6fcf4] px-1.5 py-0.5 text-[0.5625rem] font-extrabold uppercase tracking-wide text-[#173B65]">
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.description && (
                  <span className="mt-0.5 block text-xs font-medium leading-5 text-[#5E6A78]">
                    {item.description}
                  </span>
                )}
              </span>
              {!mobile && <ArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-[#9AA6B7]" size={14} />}
            </Link>
          ) : (
            <span aria-disabled="true" className={`${className} cursor-not-allowed`}>
              <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-[#0c9b87]" size={17} strokeWidth={1.8} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-1.5 text-sm font-bold">
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-[#d6fcf4] px-1.5 py-0.5 text-[0.5625rem] font-extrabold uppercase tracking-wide text-[#5E6A78]">
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.description && (
                  <span className="mt-0.5 block text-xs font-medium leading-5 text-[#5E6A78]">
                    {item.description}
                  </span>
                )}
              </span>
            </span>
          )}
        </li>
      );
    });
  }

  return (
    <div className="space-y-3">
      {ungrouped.length > 0 && (
        <ul className={`grid gap-1 ${mobile || columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
          {renderItems(ungrouped)}
        </ul>
      )}
      {groups.map((group) => (
        <section key={group}>
          <h3 className="mb-1 px-3 text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-[#5E6A78]">
            {group}
          </h3>
          <ul className={`grid gap-1 ${mobile || columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {renderItems(items.filter((item) => item.group === group))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function DesktopMenu({
  menu,
  open,
  align = "center",
  onActivate,
  onOpen,
  onClose,
}: {
  menu: NavigationMenu;
  open: boolean;
  align?: "left" | "center" | "right";
  onActivate: () => void;
  onOpen: () => void;
  onClose: () => void;
}) {
  const id = `desktop-menu-${menu.label.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;
  const MenuIcon = menu.icon;

  return (
    <li className="relative" onFocusCapture={onOpen} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-haspopup="true"
        className={`focus-ring flex min-h-10 shrink-0 items-center gap-0.5 rounded-md px-1 text-[0.5625rem] font-bold transition-colors hover:bg-[#d6fcf4] hover:text-[#173B65] xl:gap-1 xl:px-1.5 xl:text-[0.6rem] 2xl:text-[0.65625rem] ${
          open ? "bg-[#d6fcf4] text-[#173B65]" : "text-[#1B2633]"
        }`}
        onClick={onActivate}
        type="button"
      >
        {MenuIcon && (
          <MenuIcon
            aria-hidden="true"
            className={`mr-0.5 shrink-0 ${menu.label === "Reviews" ? "text-[#fe9a00]" : "text-[#0c9b87]"}`}
            size={14}
            strokeWidth={2}
          />
        )}
        {menu.label}
        {menu.badge && (
          <span className="rounded-full bg-[#d6fcf4] px-1.5 py-0.5 text-[0.5rem] font-extrabold leading-none text-[#173B65]">
            {menu.badge}
          </span>
        )}
        <ChevronDown aria-hidden="true" className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} size={13} />
      </button>
      {open && (
        <div
          className={`menu-enter absolute top-full z-[70] max-h-[min(75vh,42rem)] overflow-y-auto rounded-xl border border-[#E5EAF0] bg-white p-3 shadow-[0_14px_36px_rgba(23,59,101,0.16)] ${
            menu.kind === "services"
              ? "right-0 w-[min(40rem,calc(100vw-2rem))]"
              : align === "right"
                ? "right-0 w-[min(35rem,calc(100vw-2rem))]"
                : align === "left"
                  ? "left-0 w-[min(35rem,calc(100vw-2rem))]"
                  : "left-1/2 w-[min(35rem,calc(100vw-2rem))] -translate-x-1/2"
          }`}
          id={id}
          onMouseEnter={onOpen}
          role="region"
          aria-label={`${menu.label} menu`}
        >
          {menu.kind === "services" ? (
            <>
              <div className="mb-2 rounded-lg bg-[#d6fcf4] px-4 py-3">
                <p className="text-[0.6875rem] font-extrabold uppercase tracking-[0.12em] text-[#173B65]">Verified service directory</p>
                <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-[#5E6A78]">Background checks are not active in this preview</p>
              </div>
              <MenuItems items={menu.items.filter((item) => !item.group)} onSelect={onClose} />
              <div className="my-3 border-t border-[#E5EAF0]" />
              <p className="mb-2 px-3 text-[0.625rem] font-extrabold uppercase tracking-[0.12em] text-[#5E6A78]">My tools &amp; activity</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Saved", icon: Heart },
                  { label: "Compare", icon: Scale },
                  { label: "Alerts", icon: Bell },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex min-h-[4.5rem] flex-col items-center justify-center gap-1 rounded-xl border border-[#E5EAF0] bg-[#F8FAFC] px-2 text-center text-xs font-bold text-[#5E6A78]" aria-disabled="true">
                    <Icon aria-hidden="true" className="text-[#0c9b87]" size={18} />
                    {label}
                    <span className="text-[0.5625rem] font-semibold">Coming soon</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <MenuItems columns={menu.columns} items={menu.items} onSelect={onClose} />
          )}
        </div>
      )}
    </li>
  );
}

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleOutsidePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenus() {
    setOpenMenu(null);
    setMobileOpen(false);
  }

  function menuProps(menu: NavigationMenu) {
    return {
      menu,
      open: openMenu === menu.label,
      onOpen: () => setOpenMenu(menu.label),
      onClose: () => setOpenMenu((current) => (current === menu.label ? null : current)),
      onActivate: () => setOpenMenu((current) => (current === menu.label ? null : menu.label)),
    };
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#E5EAF0] bg-white shadow-[0_2px_12px_rgba(23,59,101,0.06)]"
      ref={headerRef}
    >
      <div className="bg-[#173B65] text-white">
        <div className="page-shell flex min-h-9 items-center justify-between gap-3 text-[0.6875rem] font-semibold sm:text-xs">
          <p className="hidden truncate text-white/80 sm:block">IndiaBrix marketplace preview</p>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden text-white/60 md:inline">Email account access</span>
            <Link
              aria-label="Log in"
              className="focus-ring inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-white/85 hover:bg-white/10 hover:text-white"
              href="/account"
              onClick={closeMenus}
            >
              <LogIn aria-hidden="true" size={14} />
              Login
            </Link>
            <span aria-hidden="true" className="text-white/35">|</span>
            <Link
              aria-label="Sign up"
              className="focus-ring inline-flex min-h-8 items-center gap-1 rounded-md px-1.5 text-white/85 hover:bg-white/10 hover:text-white"
              href="/account?mode=signup"
              onClick={closeMenus}
            >
              <UserPlus aria-hidden="true" size={14} />
              Sign Up
            </Link>
            <Link
              className="focus-ring inline-flex min-h-8 items-center gap-1 rounded-md bg-[#0c9b87] px-3 text-[0.6875rem] font-extrabold text-white shadow-[0_2px_8px_rgba(12,155,135,0.35)] transition-colors hover:bg-[#097868] sm:px-4 sm:text-xs"
              href="/#owners"
              onClick={closeMenus}
            >
              + Post Property Free
            </Link>
          </div>
        </div>
      </div>

      <div className="flex h-[62px] w-full items-center justify-between gap-2 px-3 min-[1024px]:h-[68px] min-[1024px]:gap-2 min-[1024px]:px-4">
        <Link aria-label="IndiaBrix home" className="focus-ring shrink-0 rounded-lg" href="/#top" onClick={closeMenus}>
          <BrandLogo />
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 min-[1200px]:block">
          <ul className="flex items-center justify-between gap-1 xl:gap-2">
            {primaryMenus.map((menu, index) => (
              <DesktopMenu
                align={index < 2 ? "left" : index > 5 ? "right" : "center"}
                key={menu.label}
                {...menuProps(menu)}
              />
            ))}
          </ul>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          className="focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#E5EAF0] bg-white text-[#173B65] min-[1200px]:hidden"
          onClick={() => {
            setMobileOpen((current) => !current);
            setOpenMenu(null);
          }}
          type="button"
        >
          {mobileOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6.5rem)] overflow-y-auto border-b border-[#E5EAF0] bg-white p-3 shadow-[0_14px_30px_rgba(23,59,101,0.14)] min-[1200px]:hidden"
          id="mobile-navigation"
        >
          <ul className="mx-auto flex max-w-[1320px] flex-col gap-1 px-1">
            {primaryMenus.map((menu) => {
              const isOpen = openMenu === menu.label;
              const id = `mobile-menu-${menu.label.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;
              return (
                <li key={menu.label}>
                  <button
                    aria-controls={id}
                    aria-expanded={isOpen}
                    className={`focus-ring flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-[0.8125rem] font-semibold transition-colors hover:bg-[#d6fcf4] hover:text-[#173B65] ${
                      isOpen ? "bg-[#d6fcf4] text-[#173B65]" : "text-[#1B2633]"
                    }`}
                    onClick={() => setOpenMenu((current) => (current === menu.label ? null : menu.label))}
                    type="button"
                  >
                    <span className="flex items-center gap-2">
                      {menu.label}
                      {menu.badge && (
                        <span className="rounded-full bg-[#d6fcf4] px-1.5 py-0.5 text-[0.5625rem] font-bold text-[#173B65]">
                          {menu.badge}
                        </span>
                      )}
                    </span>
                    <ChevronDown aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
                  </button>
                  {isOpen && (
                    <div className="px-1 pb-2 pt-1" id={id}>
                      <MenuItems columns={menu.columns} items={menu.items} mobile onSelect={closeMenus} />
                    </div>
                  )}
                </li>
              );
            })}
            <li className="mt-2 border-t border-[#E5EAF0] pt-2">
              <p className="px-3 py-2 text-xs font-semibold text-[#5E6A78]">Sign in or create an account to manage your IndiaBrix profile.</p>
              <Link className="focus-ring flex min-h-11 items-center justify-center rounded-lg bg-[#0c9b87] px-3 text-sm font-extrabold text-white shadow-[0_2px_8px_rgba(12,155,135,0.35)]" href="/#owners" onClick={closeMenus}>
                + Post Property Free
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
