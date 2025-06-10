"use client"

import Link from "next/link"
import ThemeSwitcher from "../themeSwitcher"
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from "../localeSwitcher"
import { IoClose } from "react-icons/io5"
import { IoMdMenu } from "react-icons/io"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)
    const t = useTranslations('Navbar')

    return (
        <nav className="w-full bg-(--background) relative flex justify-center h-(--navbar-height-mobile) md:h-(--navbar-height) shadow-md dark:shadow-[0_6px_6px_rgba(255,255,255,0.1)] z-50">

            {/* Mobile menu */}
            <ul className="flex md:hidden w-[95%] items-center flex-row justify-between">
                <li>
                    <button onClick={openMenu} className="flex justify-between items-center w-6 h-6 cursor-pointer">
                        <IoMdMenu className="scale-200 w-full" />
                    </button>
                </li>
                <li><Link className="font-comforter text-(--green) text-3xl" href="/">{t('Home')}</Link></li>
                <div className="flex gap-2 justify-end items-center">
                    <li><ThemeSwitcher /></li>
                    <li><LocaleSwitcher /></li>
                </div>

            </ul>
            <div
                className={`flex md:hidden top-0 left-0 w-2/3 h-full fixed z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="w-full h-full relative bg-(--background) overflow-y-auto">
                    <ul className="relative flex flex-col justify-center items-center gap-4 text-lg w-full z-20 pt-4 min-h-full">
                        <button onClick={closeMenu} aria-label="close menu" className="h-6 w-6 cursor-pointer top-6 absolute z-25 right-6"><IoClose className="scale-200 w-full" /></button>
                        <li className="p-2 text-xl uppercase font-extrabold">
                            <Link href="/travel-tips" onClick={closeMenu} >
                                {t('TravelTips')}
                            </Link>
                        </li>
                        <li className="p-2 text-xl uppercase font-extrabold">
                            <Link href="/adventures" onClick={closeMenu} >
                                {t('Adventures')}
                            </Link>
                        </li>
                        <li className="p-2 text-xl uppercase font-extrabold">
                            <Link href="/about" onClick={closeMenu} >
                                {t('AboutMe')}
                            </Link>
                        </li>
                        <li className="p-2 text-xl uppercase font-extrabold">
                            <Link href="/contact" onClick={closeMenu}>
                                {t('Contact')}
                            </Link>
                        </li>
                        <div className="absolute inset-0 -z-10 bg-[url('/world-map-mobile.jpg')] bg-cover bg-center opacity-50 dark:opacity-60" />
                    </ul>
                </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex flex-col w-full items-center">

                <div className="flex justify-between items-center w-[95%] max-w-5xl h-20">
                    <Link className="font-comforter text-(--green) text-4xl" href="/">{t('Home')}</Link>
                    <div className="flex gap-4 items-center">
                        <ThemeSwitcher />
                        <LocaleSwitcher />
                    </div>
                </div>
                <ul className="flex flex-row h-12 items-center justify-around w-[95%] max-w-5xl border-y-1 border-black/30 dark:border-white/50 rgba(255,255,255,0.1)">
                    {[
                        { href: "/travel-tips", label: t('TravelTips') },
                        { href: "/adventures", label: t('Adventures') },
                        { href: "/about", label: t('AboutMe') },
                        { href: "/contact", label: t('Contact') },
                    ].map(({ href, label }) => (
                        <li key={href} className="h-full group">
                            <Link
                                href={href}
                                className="relative h-full flex items-center px-6 justify-center uppercase group-hover:text-(--green) transition-colors duration-300"
                            >
                                {label}
                                <span
                                    className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-(--green) transition-transform duration-300 origin-center group-hover:scale-x-100"
                                ></span>
                            </Link>
                        </li>
                    ))}
                </ul >
            </div >
        </nav >
    )
}

export default Navbar