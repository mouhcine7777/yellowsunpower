import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { SITE_URL, GA_MEASUREMENT_ID, BUSINESS, hreflangAlternates } from "./lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "YellowSun Power | Installations Solaires Premium au Maroc";
const description =
  "YellowSun Power conçoit et installe des panneaux solaires sur-mesure pour villas, riads, hôtels et professionnels au Maroc. Étude gratuite et devis sous 48h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | YellowSun Power",
  },
  description,
  keywords: [
    "panneaux solaires Maroc",
    "installation solaire Maroc",
    "énergie solaire Maroc",
    "devis panneaux solaires",
    "solaire villa riad hôtel",
    "YellowSun Power",
  ],
  authors: [{ name: "YellowSun Power" }],
  alternates: hreflangAlternates("/", "/"),
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["en_MA", "nl_NL"],
    url: SITE_URL,
    siteName: "YellowSun Power",
    title,
    description,
    images: [
      {
        url: "/bg.webp",
        alt: "Installation de panneaux solaires YellowSun Power au Maroc",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS.name,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: BUSINESS.addressCountry,
  },
  areaServed: {
    "@type": "Country",
    name: "Morocco",
  },
  sameAs: [
    BUSINESS.instagram,
    BUSINESS.facebook,
    BUSINESS.tiktok,
    BUSINESS.snapchat,
  ],
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsApp />

        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
