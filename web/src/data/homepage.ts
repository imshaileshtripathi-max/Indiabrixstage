export type PropertyDemo = {
  title: string;
  overview: string;
  location: string;
  price: string;
  category: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  imageDescription: string;
};

export const featuredProperties: PropertyDemo[] = [
  {
    title: "Sunlit apartment with an open-plan living space",
    overview:
      "An illustrative home concept with a bright living area and room to unwind. Availability and contact details are not connected.",
    location: "Whitefield, Bengaluru",
    price: "₹ 1.28 Cr",
    category: "For sale",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,180 sq ft",
    image: "/images/indiabrix-apartment.jpg",
    imageDescription: "Bright contemporary apartment interior",
  },
  {
    title: "A calm city home close to everyday essentials",
    overview:
      "An illustrative rental home concept near everyday city conveniences. Availability and contact details are not connected.",
    location: "Powai, Mumbai",
    price: "₹ 78,000 / month",
    category: "For rent",
    propertyType: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "980 sq ft",
    image: "/images/indiabrix-villa.jpg",
    imageDescription: "Modern apartment living room with warm natural light",
  },
  {
    title: "Room to grow in a thoughtfully planned residence",
    overview:
      "An illustrative family home concept with generous shared spaces. Availability and contact details are not connected.",
    location: "Sector 62, Gurugram",
    price: "₹ 2.15 Cr",
    category: "For sale",
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,640 sq ft",
    image: "/images/indiabrix-apartment.jpg",
    imageDescription: "Tastefully furnished contemporary home",
  },
  {
    title: "A relaxed home with room for everyone",
    overview:
      "An illustrative independent home concept with private outdoor space. Availability and contact details are not connected.",
    location: "Sarjapur Road, Bengaluru",
    price: "₹ 1.86 Cr",
    category: "For sale",
    propertyType: "Independent house",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,920 sq ft",
    image: "/images/indiabrix-villa.jpg",
    imageDescription: "Contemporary independent home with garden",
  },
];

export const popularCities = [
  {
    name: "Mumbai",
    note: "Coastal energy, endless possibility",
    image: "/images/indiabrix-villa.jpg",
  },
  {
    name: "Delhi NCR",
    note: "A new perspective on city life",
    image: "/images/indiabrix-hero.jpg",
  },
  {
    name: "Gurugram",
    note: "Make room for what’s next",
    image: "/images/indiabrix-hero.jpg",
  },
  {
    name: "Bengaluru",
    note: "Room to grow and find your rhythm",
    image: "/images/indiabrix-commercial.jpg",
  },
  {
    name: "Hyderabad",
    note: "Old-world charm, modern momentum",
    image: "/images/indiabrix-apartment.jpg",
  },
  {
    name: "Pune",
    note: "A little space to slow down",
    image: "/images/indiabrix-villa.jpg",
  },
  {
    name: "Chennai",
    note: "A city with its own rhythm",
    image: "/images/indiabrix-commercial.jpg",
  },
  {
    name: "Kolkata",
    note: "Character around every corner",
    image: "/images/indiabrix-hero.jpg",
  },
];

export const propertyCategories = [
  { name: "Apartments", description: "Homes for every kind of next step", icon: "apartment" },
  { name: "Independent Houses", description: "More room to call your own", icon: "house" },
  { name: "Villas", description: "Space to live a little differently", icon: "villa" },
  { name: "Plots", description: "A place to build your plans", icon: "plot" },
  { name: "Office Spaces", description: "Workspaces for growing teams", icon: "office" },
  { name: "Retail Shops", description: "Spaces to bring business to life", icon: "retail" },
  { name: "Warehouses", description: "Practical space for operations", icon: "warehouse" },
];

export const newProjectDemos = [
  {
    name: "The Courtyard Residences",
    location: "Pune, Maharashtra",
    detail: "2 & 3 bedroom homes · Sample project",
    price: "Indicative price ₹ 96 L onwards",
    image: "/images/indiabrix-apartment.jpg",
    imageDescription: "Illustrative contemporary residential building",
  },
  {
    name: "Aarohan Business District",
    location: "Hyderabad, Telangana",
    detail: "Flexible workspaces · Sample project",
    price: "Indicative price ₹ 72 L onwards",
    image: "/images/indiabrix-commercial.jpg",
    imageDescription: "Illustrative modern commercial building",
  },
];
