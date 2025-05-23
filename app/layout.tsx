import "./globals.css";
import { Albert_Sans, Montserrat_Alternates, Comforter_Brush } from "next/font/google"
import Link from "next/link";
import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
import ThemeSwitcher from "./components/themeSwitcher";

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
      <body className={`${albertSans.className} ${montserratAlternates.variable} ${comforterBrush.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <nav>
              <ul className="flex items-center justify-between">
                <li><Link href="/">Home</Link></li>
                <li><Link className="nav--link-main" href="/">Jan Blaška Travel Diary</Link></li>
                <li><Link href="/about">About</Link></li>
                <ThemeSwitcher />
              </ul>
            </nav>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html >
  );
}
