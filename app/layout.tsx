import "./globals.css";
import { Albert_Sans, Montserrat_Alternates, Comforter_Brush, Barlow_Condensed } from "next/font/google"
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${albertSans.className} ${montserratAlternates.variable} ${comforterBrush.variable} ${barlowCondensed.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <Navbar />
          </header>
          {children}
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html >
  );
}
