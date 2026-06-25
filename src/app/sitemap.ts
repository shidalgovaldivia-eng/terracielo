import type { MetadataRoute } from "next";
import { galleryImages, heroImage, siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [heroImage.src, ...galleryImages.slice(0, 3).map((image) => image.src)]
    },
    {
      url: `${siteConfig.url}/carta`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95
    }
  ];
}
