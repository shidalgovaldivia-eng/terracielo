import { siteConfig, featuredDishes, heroImage } from "@/data/site";

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Restaurant", "BarOrPub"],
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    image: [heroImage.src, ...featuredDishes.slice(0, 3).map((dish) => dish.src)],
    telephone: siteConfig.displayPhone,
    priceRange: "$$",
    servesCuisine: ["Gastronomia", "Cocteleria", "Cafe", "Bar food"],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country
    },
    areaServed: ["Alto Hospicio", "Iquique", "Tarapaca"],
    sameAs: [siteConfig.instagramUrl],
    hasMenu: siteConfig.fudoMenuUrl,
    acceptsReservations: true,
    openingHours: ["Mo-Th 12:30-23:30", "Fr-Sa 12:30-02:00", "Su 12:30-22:30"],
    keywords: siteConfig.keywords.join(", ")
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
