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
    const t = useTranslations('Navbar')

    const navLinks = [
        { href: "/travel-tips", label: t('TravelTips') },
        { href: "/adventures", label: t('Adventures') },
        { href: "/about", label: t('AboutMe') },
        { href: "/contact", label: t('Contact') },
    ]

    return (
        <>
            <nav className="w-full bg-white/95 dark:bg-black/95 backdrop-blur-md relative flex items-center justify-center h-(--navbar-height-mobile) md:h-(--navbar-height) border-b border-black/10 dark:border-white/10 z-50">

                {/* Desktop */}
                <div className="hidden md:flex items-center justify-between w-[95%] max-w-6xl mx-auto">
                    <Link
                        className="font-cinzel font-bold tracking-[0.25em] text-(--green) text-xl hover:opacity-70 transition-opacity duration-300"
                        href="/"
                    >
                        {t('Home')}
                    </Link>

                    <ul className="flex items-center gap-10">
                        {navLinks.map(({ href, label }) => (
                            <li key={href} className="group relative py-1">
                                <Link
                                    href={href}
                                    className="text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-(--green)"
                                >
                                    {label}
                                </Link>
                                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-(--green) transition-all duration-300 group-hover:w-full" />
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-3 items-center">
                        <ThemeSwitcher />
                        <LocaleSwitcher />
                    </div>
                </div>

                {/* Mobile bar */}
                <div className="flex md:hidden items-center justify-between w-full px-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        aria-label="open menu"
                        className="p-1.5 rounded-lg hover:bg-(--green)/10 transition-colors"
                    >
                        <IoMdMenu className="w-6 h-6" />
                    </button>
                    <Link className="font-cinzel font-bold tracking-widest text-(--green) text-lg" href="/">
                        {t('Home')}
                    </Link>
                    <div className="flex gap-2 items-center">
                        <ThemeSwitcher />
                        <LocaleSwitcher />
                    </div>
                </div>
            </nav>

            {/* Mobile slide-in menu */}
            <div className={`md:hidden fixed inset-0 z-[60] transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                />

                {/* Panel */}
                <div className={`absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-white dark:bg-black shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="relative flex flex-col h-full overflow-hidden">
                        {/* World map hint */}
                        <div className="absolute inset-0 bg-[url('/world-map-mobile.jpg')] bg-cover bg-center opacity-[0.07] dark:opacity-[0.12]" />

                        {/* Panel header */}
                        <div className="relative flex justify-between items-center px-6 py-5 border-b border-black/10 dark:border-white/10">
                            <Link
                                className="font-cinzel font-bold tracking-widest text-(--green) text-xl"
                                href="/"
                                onClick={() => setIsOpen(false)}
                            >
                                {t('Home')}
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="close menu"
                                className="p-1.5 rounded-lg hover:bg-(--green)/10 transition-colors"
                            >
                                <IoClose className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav links */}
                        <ul className="relative flex flex-col px-4 py-6 gap-1">
                            {navLinks.map(({ href, label }, index) => (
                                <li
                                    key={href}
                                    style={{ transitionDelay: isOpen ? `${index * 60 + 80}ms` : '0ms' }}
                                    className={`transform transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                                >
                                    <Link
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-bold tracking-[0.15em] uppercase hover:bg-(--green)/10 hover:text-(--green) transition-all duration-200 group"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-(--green) transition-all duration-200 shrink-0" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
