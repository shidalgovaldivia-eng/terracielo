import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const socialImageUrl = "https://terracielo.vercel.app/images/terracielo/terraza-luces.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Terracielo Gastrobar | Restaurante, cocteleria y eventos en Alto Hospicio",
    template: "%s | Terracielo Gastrobar"
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Terracielo Gastrobar | Sabor y vida en Alto Hospicio",
    description: "Restaurante, cafeteria, cocteleria, karaoke, DJ y eventos privados en Alto Hospicio.",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Terraza nocturna de Terracielo Gastrobar en Alto Hospicio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Terracielo Gastrobar",
    description: "Gastronomia, cocteleria y experiencias unicas en Alto Hospicio.",
    images: [socialImageUrl]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070405"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
