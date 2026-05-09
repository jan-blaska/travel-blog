import "./globals.css";
import { Albert_Sans, Montserrat_Alternates, Comforter_Brush, Barlow_Condensed, Cinzel } from "next/font/google"
import ThemeProvider from "@/components/ThemeProvider"
import { cookies } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { SITE_URL, SITE_NAME, siteDescription } from '@/lib/metadata';

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap"
})

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates"
})

const comforterBrush = Comforter_Brush({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-comforter-brush"
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed"
})

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
  variable: "--font-cinzel"
})

export const viewport: Viewport = {
  themeColor: '#2d7a4f',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const description = siteDescription(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    openGraph: {
      siteName: SITE_NAME,
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@janukutravel',
      creator: '@janukutravel',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}


export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const resolvedTheme = themeCookie === 'dark' ? 'dark' : themeCookie === 'light' ? 'light' : undefined;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Uku Jan',
    url: SITE_URL,
    description: siteDescription('en'),
    jobTitle: 'Travel Blogger',
  };

  return (
    <html suppressHydrationWarning lang={locale} className={resolvedTheme ?? ''}>
      <body className={`${albertSans.className} ${montserratAlternates.variable} ${comforterBrush.variable} ${barlowCondensed.variable} ${cinzel.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <NextIntlClientProvider>
          <ThemeProvider>
            <header>
              <Navbar />
            </header>
            {children}
            <footer>
              <Footer />
            </footer>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html >
  );
}
