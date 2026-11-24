export const searchModes = [
  "Buy",
  "Rent",
  "New Projects",
  "PG & Co-living",
  "Commercial",
  "Plots",
] as const;
export type TransactionMode = (typeof searchModes)[number];

export type AdvancedFilterField = {
  key: string;
  label: string;
  kind: "select" | "text" | "number" | "date" | "checkbox";
  options?: readonly string[];
  placeholder?: string;
};

export type AdvancedFilterGroup = {
  label: string;
  fields: readonly AdvancedFilterField[];
};

export const propertyTypes: Record<TransactionMode, readonly string[]> = {
  Buy: [
    "Apartment / Flat",
    "Independent House",
    "Villa",
    "Residential Plot",
    "Builder Floor",
    "Penthouse",
    "Studio Apartment",
  ],
  Rent: [
    "Apartment / Flat",
    "Independent House",
    "Villa",
    "Builder Floor",
    "Studio Apartment",
    "PG / Co-living",
  ],
  "PG & Co-living": [
    "PG for Men",
    "PG for Women",
    "Co-living Space",
    "Single Sharing",
    "Double Sharing",
    "Triple Sharing",
    "Fully Furnished PG",
    "PG with Meals",
  ],
  Commercial: [
    "Office Space",
    "Retail Shop",
    "Showroom",
    "Warehouse",
    "Industrial Building",
    "Industrial Land",
    "Co-working Space",
    "Commercial Plot",
    "Restaurant / Hospitality Space",
  ],
  Plots: ["Residential Plot", "Commercial Plot", "Agricultural Land"],
  "New Projects": [
    "Apartment / Flat",
    "Villa",
    "Residential Plot",
    "Commercial",
  ],
};

const furnishingOptions = ["Unfurnished", "Semi-furnished", "Furnished"];
const parkingOptions = ["1 parking", "2 parking", "3+ parking"];
const possessionOptions = ["Ready to move", "Under construction"];
const postedByOptions = ["Owner", "Agent", "Builder"];
const areaFields: AdvancedFilterField[] = [
  {
    key: "minArea",
    label: "Minimum property area (sq ft)",
    kind: "number",
    placeholder: "Minimum",
  },
  {
    key: "maxArea",
    label: "Maximum property area (sq ft)",
    kind: "number",
    placeholder: "Maximum",
  },
];
const amenityField: AdvancedFilterField = {
  key: "amenities",
  label: "Amenities",
  kind: "text",
  placeholder: "e.g. Gym, pool, clubhouse",
};
const postedByField: AdvancedFilterField = {
  key: "postedBy",
  label: "Posted by",
  kind: "select",
  options: postedByOptions,
};

export const advancedFilterGroups: Record<
  TransactionMode,
  readonly AdvancedFilterGroup[]
> = {
  Buy: [
    {
      label: "Property Details",
      fields: [
        {
          key: "bathrooms",
          label: "Bathrooms",
          kind: "select",
          options: ["1", "2", "3", "4+"],
        },
        {
          key: "furnishing",
          label: "Furnishing status",
          kind: "select",
          options: furnishingOptions,
        },
        {
          key: "propertyAge",
          label: "Property age",
          kind: "select",
          options: ["Under construction", "Under 1 year", "1–5 years", "5+ years"],
        },
        {
          key: "floorNumber",
          label: "Floor number",
          kind: "text",
          placeholder: "Any floor",
        },
        {
          key: "totalFloors",
          label: "Total floors",
          kind: "text",
          placeholder: "Any",
        },
        {
          key: "reraInfo",
          label: "RERA information",
          kind: "select",
          options: ["Number provided", "Not provided"],
        },
        {
          key: "reraNumber",
          label: "RERA number",
          kind: "text",
          placeholder: "Enter RERA number",
        },
      ],
    },
    { label: "Budget and Area", fields: areaFields },
    {
      label: "Features and Amenities",
      fields: [
        { key: "parking", label: "Parking", kind: "select", options: parkingOptions },
        {
          key: "facing",
          label: "Facing",
          kind: "select",
          options: ["North", "South", "East", "West", "North-east"],
        },
        { key: "gatedCommunity", label: "Gated community", kind: "checkbox" },
        amenityField,
      ],
    },
    {
      label: "Availability and Possession",
      fields: [
        {
          key: "possessionStatus",
          label: "Possession status",
          kind: "select",
          options: possessionOptions,
        },
        {
          key: "possessionTimeline",
          label: "Possession timeline",
          kind: "select",
          options: ["Within 6 months", "Within 1 year", "1–2 years", "2+ years"],
        },
      ],
    },
    { label: "Posted By", fields: [postedByField] },
  ],
  Rent: [
    {
      label: "Property Details",
      fields: [
        {
          key: "bathrooms",
          label: "Bathrooms",
          kind: "select",
          options: ["1", "2", "3", "4+"],
        },
      ],
    },
    { label: "Budget and Area", fields: areaFields },
    {
      label: "Features and Amenities",
      fields: [
        {
          key: "furnishing",
          label: "Furnishing status",
          kind: "select",
          options: furnishingOptions,
        },
        { key: "parking", label: "Parking", kind: "select", options: parkingOptions },
        { key: "powerBackup", label: "Power backup", kind: "checkbox" },
        { key: "lift", label: "Lift", kind: "checkbox" },
        amenityField,
      ],
    },
    {
      label: "Availability and Possession",
      fields: [
        {
          key: "securityDeposit",
          label: "Security deposit",
          kind: "select",
          options: ["Up to 1 month", "Up to 3 months", "Up to 6 months"],
        },
        {
          key: "availableFrom",
          label: "Available from",
          kind: "date",
        },
        {
          key: "preferredTenant",
          label: "Preferred tenant",
          kind: "select",
          options: ["Family", "Bachelor", "Company"],
        },
      ],
    },
    { label: "Posted By", fields: [postedByField] },
  ],
  "PG & Co-living": [
    {
      label: "Accommodation",
      fields: [
        {
          key: "genderPreference",
          label: "Gender preference",
          kind: "select",
          options: ["Men", "Women", "Any"],
        },
        {
          key: "sharingType",
          label: "Sharing type",
          kind: "select",
          options: ["Single", "Double", "Triple"],
        },
        {
          key: "meals",
          label: "Meals",
          kind: "select",
          options: ["Included", "Not included"],
        },
        {
          key: "attachedBathroom",
          label: "Attached bathroom",
          kind: "checkbox",
        },
      ],
    },
    { label: "Budget and Area", fields: areaFields },
    {
      label: "Features and Amenities",
      fields: [
        {
          key: "furnishing",
          label: "Furnishing status",
          kind: "select",
          options: furnishingOptions,
        },
        { key: "ac", label: "Air conditioning", kind: "checkbox" },
        { key: "wifi", label: "Wi-Fi", kind: "checkbox" },
      ],
    },
    {
      label: "Availability",
      fields: [{ key: "availableFrom", label: "Available from", kind: "date" }],
    },
  ],
  Commercial: [
    {
      label: "Property Details",
      fields: [
        {
          key: "commercialListingType",
          label: "Sale or rent",
          kind: "select",
          options: ["Sale", "Rent"],
        },
        {
          key: "furnishing",
          label: "Furnishing status",
          kind: "select",
          options: furnishingOptions,
        },
        {
          key: "washrooms",
          label: "Washrooms",
          kind: "select",
          options: ["1", "2", "3", "4+"],
        },
        {
          key: "floorNumber",
          label: "Floor number",
          kind: "text",
          placeholder: "Any floor",
        },
        {
          key: "totalFloors",
          label: "Total floors",
          kind: "text",
          placeholder: "Any",
        },
        {
          key: "roadWidth",
          label: "Road width",
          kind: "text",
          placeholder: "Minimum width",
        },
      ],
    },
    { label: "Budget and Area", fields: areaFields },
    {
      label: "Features and Amenities",
      fields: [
        { key: "parking", label: "Parking", kind: "select", options: parkingOptions },
        { key: "powerBackup", label: "Power backup", kind: "checkbox" },
        amenityField,
      ],
    },
    {
      label: "Availability and Possession",
      fields: [
        {
          key: "possessionStatus",
          label: "Possession status",
          kind: "select",
          options: possessionOptions,
        },
        {
          key: "leaseDuration",
          label: "Lease duration",
          kind: "select",
          options: ["1 year", "3 years", "5 years", "Flexible"],
        },
      ],
    },
    { label: "Posted By", fields: [postedByField] },
  ],
  Plots: [
    {
      label: "Plot Details",
      fields: [
        {
          key: "plotArea",
          label: "Plot area",
          kind: "number",
          placeholder: "Area in sq ft",
        },
        {
          key: "areaUnit",
          label: "Area unit",
          kind: "select",
          options: ["sq ft", "sq yd", "sq m", "acre"],
        },
        {
          key: "facing",
          label: "Facing",
          kind: "select",
          options: ["North", "South", "East", "West", "North-east"],
        },
        {
          key: "roadWidth",
          label: "Road width",
          kind: "text",
          placeholder: "e.g. 30 ft",
        },
        { key: "cornerPlot", label: "Corner plot", kind: "checkbox" },
      ],
    },
    { label: "Budget and Area", fields: areaFields },
    {
      label: "Land and Ownership",
      fields: [
        {
          key: "landUse",
          label: "Land use",
          kind: "select",
          options: ["Residential", "Commercial", "Agricultural", "Industrial"],
        },
        {
          key: "ownershipType",
          label: "Ownership type",
          kind: "select",
          options: ["Freehold", "Leasehold", "Power of attorney"],
        },
        {
          key: "approvalDetails",
          label: "Approvals",
          kind: "text",
          placeholder: "Enter approval details",
        },
      ],
    },
  ],
  "New Projects": [
    {
      label: "Property Details",
      fields: [
        {
          key: "configuration",
          label: "Configuration",
          kind: "select",
          options: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"],
        },
      ],
    },
    {
      label: "Budget and Area",
      fields: [
        {
          key: "projectArea",
          label: "Project area",
          kind: "text",
          placeholder: "e.g. 5 acres",
        },
      ],
    },
    {
      label: "Features and Amenities",
      fields: [amenityField],
    },
    {
      label: "Availability and Possession",
      fields: [
        {
          key: "projectStatus",
          label: "Project status",
          kind: "select",
          options: ["Upcoming", "Under construction", "Ready to move"],
        },
        {
          key: "possessionTimeline",
          label: "Possession timeline",
          kind: "select",
          options: ["Within 6 months", "Within 1 year", "1–2 years", "2+ years"],
        },
        {
          key: "reraStatus",
          label: "RERA information",
          kind: "select",
          options: ["Number provided", "Not provided"],
        },
        {
          key: "reraNumber",
          label: "RERA number",
          kind: "text",
          placeholder: "Enter RERA number",
        },
      ],
    },
    {
      label: "Posted By",
      fields: [
        {
          key: "developer",
          label: "Developer / builder",
          kind: "text",
          placeholder: "Enter developer name",
        },
        {
          key: "postedBy",
          label: "Posted by",
          kind: "select",
          options: ["Builder"],
        },
      ],
    },
  ],
};
