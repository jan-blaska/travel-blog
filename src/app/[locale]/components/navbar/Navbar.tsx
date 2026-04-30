"use client"

import { Link } from "@/i18n/navigation"
import ThemeSwitcher from "../themeSwitcher"
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from "../localeSwitcher"
import { IoClose } from "react-icons/io5"
import { IoMdMenu } from "react-icons/io"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const openMenu = () => setIsOpen(true)
    const closeMenu = () => setIsOpen(false)
    const t = useTranslations('Navbar')

    const links = [
        { href: "/travel-tips", label: t('TravelTips') },
        { href: "/adventures", label: t('Adventures') },
        { href: "/about", label: t('AboutMe') },
        { href: "/contact", label: t('Contact') },
    ]

    return (
        <nav className="w-full bg-(--background) relative flex justify-center h-(--navbar-height-mobile) md:h-(--navbar-height) border-b border-(--orange)/30 z-50">

            {/* Mobile top bar */}
            <div className="flex md:hidden w-[95%] items-center justify-between">
                <button onClick={openMenu} aria-label="open menu" className="cursor-pointer p-1">
                    <IoMdMenu className="w-6 h-6" />
                </button>
                <Link className="font-cinzel font-bold tracking-widest text-(--green) text-base" href="/">
                    {t('Home')}
                </Link>
                <div className="flex gap-3 items-center">
                    <ThemeSwitcher />
                    <LocaleSwitcher />
                </div>
            </div>

            {/* Mobile drawer backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile slide-in drawer */}
            <div className={`fixed top-0 left-0 w-72 h-screen z-50 md:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="w-full h-full bg-(--background) flex flex-col overflow-y-auto">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-(--orange)/20">
                        <Link className="font-cinzel font-bold tracking-widest text-(--green) text-sm" href="/" onClick={closeMenu}>
                            {t('Home')}
                        </Link>
                        <button onClick={closeMenu} aria-label="close menu" className="cursor-pointer p-1">
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>
                    <ul className="flex flex-col px-6 py-4 flex-1">
                        {links.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 py-4 border-b border-(--orange)/10 font-barlow-condensed uppercase tracking-widest text-lg hover:text-(--orange) transition-colors duration-200 last:border-0"
                                >
                                    <span className="w-1 h-1 rounded-full bg-(--orange) shrink-0" />
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="absolute inset-0 -z-10 bg-[url('/world-map-mobile.jpg')] bg-cover bg-center opacity-10 dark:opacity-5" />
                </div>
            </div>

            {/* Desktop single row */}
            <div className="hidden md:flex w-[95%] max-w-5xl items-center justify-between">

                <Link className="font-cinzel font-bold tracking-widest text-(--green) text-xl shrink-0" href="/">
                    {t('Home')}
                </Link>

                <ul className="flex items-center">
                    {links.map(({ href, label }, i) => (
                        <li key={href} className="flex items-center">
                            {i > 0 && (
                                <span className="mx-2 text-(--orange)/40 select-none text-xs">◆</span>
                            )}
                            <Link
                                href={href}
                                className="group relative px-3 py-1 font-barlow-condensed uppercase tracking-widest text-sm hover:text-(--orange) transition-colors duration-300"
                            >
                                {label}
                                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-(--orange) transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex gap-4 items-center shrink-0">
                    <ThemeSwitcher />
                    <LocaleSwitcher />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
