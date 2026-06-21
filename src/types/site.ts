export type NavItem = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  galleryClassName?: string;
};

export type FeaturedItem = ImageAsset & {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export type EventItem = ImageAsset & {
  name: string;
  description: string;
  schedule: string;
  badge?: string;
  ctaMessage?: string;
};

export type Testimonial = {
  name: string;
  rating: number;
  text: string;
  detail: string;
};

export type Promotion = {
  title: string;
  description: string;
  badge: string;
  validity?: string;
  ctaMessage?: string;
};
