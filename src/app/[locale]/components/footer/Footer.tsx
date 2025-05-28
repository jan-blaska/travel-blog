"use client"

import useWindowWidth from "@/src/app/[locale]/custom-hooks/useWindowWidth";
import Link from "next/link"
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

export default function Footer() {
    const width = useWindowWidth();
    const { resolvedTheme } = useTheme()
    const t = useTranslations('Footer')

    return (
        <footer>
            {/* wave created by generator - https://getwaves.io/*/}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill={resolvedTheme === 'dark' ? "#282725" : "#3D3A33"} fillOpacity="1" d="M0,160L26.7,181.3C53.3,203,107,245,160,234.7C213.3,224,267,160,320,154.7C373.3,149,427,203,480,234.7C533.3,267,587,277,640,272C693.3,267,747,245,800,240C853.3,235,907,245,960,234.7C1013.3,224,1067,192,1120,160C1173.3,128,1227,96,1280,96C1333.3,96,1387,128,1413,144L1440,160L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path>
            </svg>
            <div className="bg-(--footer-background) text-white flex justify-center pb-8">
                <div className="flex flex-col max-w-5xl w-[95%] justify-center">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex flex-col justify-between gap-4 sm:w-3/5">
                            <span className="font-comforter text-4xl md:text-5xl">{t('Home')}</span>
                            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                                <div className="flex flex-col text-xl">
                                    <Link href="/about-me">{t('AboutMe')}</Link>
                                    <Link href="#">{t('Adventures')}</Link>
                                    <Link href="/contact">{t('Contact')}</Link>
                                </div>
                                <div className="flex flex-col items-start md:items-center gap-2">
                                    <span>{t('SocialMediaPrompt')}</span>
                                    <div className="flex gap-2">
                                        <a className="bg-white w-8 h-8 rounded-full p-1"
                                            href="https://www.facebook.com/honzablaska">
                                            <img src="/footer/facebook.png" alt="facebook icon" />
                                        </a>
                                        <a className="bg-white w-8 h-8 rounded-full p-1"
                                            href="https://www.instagram.com/honzablaska/">
                                            <img src="/footer/instagram.png" alt="instagram icon" />
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <p>{t('Copyright')}</p>
                        </div>
                        <div className="hidden sm:w-2/5 sm:justify-end sm:flex justify-center">
                            <img className="w-48 rounded-3xl" src="/footer/me-column.jpg" alt="jan blaska standing by the column" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}