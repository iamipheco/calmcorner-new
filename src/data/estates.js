// data/estates.js

export const FEATURED_ESTATES = [
  {
    slug: "calmvilla-residence",
    name: "CalmVilla Residence",
    tag: "Now Selling",

    image: "/images/properties/calmvilla-flyer.jpg",

    images: [
      "/images/properties/calmvilla-flyer.jpg",
    ],

    area: "Atuma-Iga, Delta State",
    location: "Oshimili-North LGA, Atuma-Iga, Delta State",

    mapQuery: "Atuma-Iga, Delta State, Nigeria",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3965.3542712440076!2d6.565580106468185!3d6.348153222786213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjAnNTUuNyJOIDbCsDM0JzAyLjQiRQ!5e0!3m2!1sen!2sng!4v1785579990399!5m2!1sen!2sng",

    price: "₦1.8M Promo Price",
    originalPrice: "₦3.0M Actual Price",

    // Add more entries here as additional plot sizes become available —
    // the selector on the estate detail page updates automatically.
    plotSizes: [
      { size: "464 SQM", price: "₦1.8M", originalPrice: "₦3.0M" },
    ],

    description:
      "Located in Atuma-Iga, a fast-developing part of Oshimili North in Delta State, CalmVilla Residence offers a rare early-entry opportunity for investors and homeowners seeking genuine value close to Asaba. This estate is strategically positioned within easy reach of Asaba International Airport and the surrounding communities, and boasts a calm, dry, buildable environment ideal for residential development or long-term investment.",

    landmarks: [
      "Behind Olaedo Pineleaf Estate",
      "15 mins drive from Asaba Int'l Airport",
      "10 mins drive from Asaba Ogwasi",
      "5 mins drive from Otulu Junction",
      "2 mins drive from Atuma-Iga Health Center",
    ],

    highlights: [
      {
        icon: "instant",
        label: "Instant Allocation",
      },
      {
        icon: "land",
        label: "100% Table Dry Land",
      },
      {
        icon: "build",
        label: "Buy & Build Immediately",
      },
      {
        icon: "deed",
        label: "Deed of Assignment",
      },
      {
        icon: "survey",
        label: "Registered Survey",
      },
      {
        icon: "road",
        label: "Good Road Network",
      },
    ],

    // Link to the specific Facebook post about this estate once you have
    // one — until then this is left unset and falls back to the main
    // Calmcorner Facebook page automatically.
    facebookUrl: "",

    whatsappMessage:
      "Hello Calmcorner, I'm interested in CalmVilla Residence. Please send me more information.",
  },

  // {
  //   slug: "golden-reserve-estate",

  //   name: "Golden Reserve Estate",

  //   tag: "Coming Soon",

  //   image: "/images/properties/golden-reserve-flyer.jpg",

  //   images: [
  //     "/images/properties/golden-reserve-flyer.jpg",
  //   ],

  //   location: "Delta State",

  //   mapQuery: "Delta State, Nigeria",

  //   price: "Price on Request",

  //   description:
  //     "Golden Reserve Estate will deliver another premium investment opportunity for homeowners and investors.",

  //   highlights: [
  //     {
  //       icon: "survey",
  //       label: "Verified Titles",
  //     },
  //     {
  //       icon: "deed",
  //       label: "Legal Documentation",
  //     },
  //     {
  //       icon: "payment",
  //       label: "Flexible Payment",
  //     },
  //     {
  //       icon: "land",
  //       label: "Dry Table Land",
  //     },
  //     {
  //       icon: "road",
  //       label: "Good Road Network",
  //     },
  //     {
  //       icon: "water",
  //       label: "Water Supply",
  //     },
  //     {
  //       icon: "power",
  //       label: "Power Infrastructure",
  //     },
  //     {
  //       icon: "security",
  //       label: "Excellent Investment",
  //     },
  //   ],

  //   whatsappMessage:
  //     "Hello Calmcorner, I'd like to know more about Golden Reserve Estate.",
  // },

  // {
  //   slug: "serene-court-estate",

  //   name: "Serene Court Estate",

  //   tag: "Coming Soon",

  //   image: "/images/properties/serene-court-flyer.jpg",

  //   images: [
  //     "/images/properties/serene-court-flyer.jpg",
  //   ],

  //   location: "Delta State",

  //   mapQuery: "Delta State, Nigeria",

  //   price: "Price on Request",

  //   description:
  //     "Serene Court Estate offers another premium opportunity for smart investors looking for future value.",

  //   highlights: [
  //     {
  //       icon: "survey",
  //       label: "Verified Documentation",
  //     },
  //     {
  //       icon: "deed",
  //       label: "Legal Papers",
  //     },
  //     {
  //       icon: "land",
  //       label: "Dry Land",
  //     },
  //     {
  //       icon: "payment",
  //       label: "Flexible Payment",
  //     },
  //     {
  //       icon: "road",
  //       label: "Excellent Road Network",
  //     },
  //     {
  //       icon: "water",
  //       label: "Water Supply",
  //     },
  //     {
  //       icon: "power",
  //       label: "Electricity Ready",
  //     },
  //     {
  //       icon: "security",
  //       label: "Safe Investment",
  //     },
  //   ],

  //   whatsappMessage:
  //     "Hello Calmcorner, notify me when Serene Court Estate launches.",
  // },
];

export const OTHER_ESTATES = [
  {
    slug: "harmony-gardens-estate",

    name: "Harmony Gardens Estate",

    location: "Delta State",

    price: "Price on Request",

    blurb:
      "A future Calmcorner development with premium infrastructure and secure investment opportunities.",

    tag: "Coming Soon",

    gradientIndex: 0,

    mapQuery: "Delta State, Nigeria",

    badges: [
      {
        icon: "survey",
        label: "Verified Documentation",
      },
      {
        icon: "payment",
        label: "Flexible Payment",
      },
      {
        icon: "road",
        label: "Road Access",
      },
      {
        icon: "security",
        label: "Secure Investment",
      },
    ],

    features: [
      "Verified Documentation",
      "Excellent Investment",
      "Road Access",
      "Dry Table Land",
      "Good Water Supply",
      "Electricity Available",
    ],
  },
];