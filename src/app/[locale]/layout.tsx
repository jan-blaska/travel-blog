import "./globals.css";
import { Albert_Sans, Montserrat_Alternates, Comforter_Brush, Barlow_Condensed } from "next/font/google"
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

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

export const metadata: Metadata = {
  title: 'Travel Blog',
  description: 'travel diaries, travel tips',
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

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={`${albertSans.className} ${montserratAlternates.variable} ${comforterBrush.variable} ${barlowCondensed.variable}`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
