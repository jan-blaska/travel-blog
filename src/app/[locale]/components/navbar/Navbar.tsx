"use client"

import Link from "next/link"
import ThemeSwitcher from "../themeSwitcher"
import navbarAdventures from "./navbarAdventures"
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from "../localeSwitcher"
import { IoClose } from "react-icons/io5"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)
    const t = useTranslations('Navbar')

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }

        return () => {
            document.body.classList.remove('overflow-hidden') // cleanup
        };
    }, [isOpen]);

    return (
        <nav className="relative flex justify-center h-24 shadow-md dark:shadow-[0_6px_6px_rgba(255,255,255,0.1)] z-50">

            {/* Mobile menu */}
            <ul className="flex md:hidden w-[95%] items-center justify-between">
                <li>
                    <button onClick={toggleMenu} className="flex flex-col justify-between items-center w-6 h-6 cursor-pointer">
                        <span className={`block h-1 bg-(--foreground) transform transition duration-300 ease-in-out origin-center ${isOpen ? 'rotate-45 translate-y-[10px] w-8' : 'w-6'}`} />
                        <span className={`block h-1 w-full bg-(--foreground) transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`} />
                        <span className={`block h-1 bg-(--foreground) transform transition duration-300 ease-in-out origin-center ${isOpen ? '-rotate-45 -translate-y-[10px] w-8' : 'w-6'}`} />
                    </button>
                </li>
                <li><Link className="font-comforter text-(--green) text-3xl" href="/">{t('Home')}</Link></li>
                <li><ThemeSwitcher /></li>
            </ul>
            <div
                className={`flex md:hidden top-24 left-0 w-full h-full fixed z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="w-full h-full relative bg-(--background)">
                    <ul className="absolute flex flex-col text-lg w-full z-20 pt-4">
                        <li className="p-2 text-xl uppercase underline font-extrabold"><Link href="/about" onClick={closeMenu} >
                            {t('AboutMe')}
                        </Link></li>
                        <div className="p-2">
                            <span className="uppercase text-xl font-extrabold">
                                {t('Adventures')}
                            </span>
                            {navbarAdventures.map((continent) => {
                                return <div key={continent.params} className="pl-4 py-2">
                                    <span className="font-extrabold">{t(continent.translationKey)}</span>
                                    <ul className="flex flex-wrap pl-4 gap-x-2">
                                        {continent.countries.map((country) => {
                                            return (
                                                <li key={country.params}>
                                                    <Link
                                                        href={`/adventures/${continent.translationKey.toLowerCase()}/${country.params}`}
                                                        className="block underline text-xl p-1 font-extrabold"
                                                    >
                                                        {t(country.translationKey)}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            })}
                        </div>

                        <li className="p-2 text-xl uppercase underline font-extrabold"><Link href="/contact" onClick={closeMenu}>
                            {t('Contact')}
                        </Link></li>
                    </ul>
                    <div className="absolute inset-0 z-10 bg-[url('/world-map-mobile.jpg')] bg-cover bg-center opacity-50 dark:opacity-60" />

                </div>

            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex w-[95%] items-center justify-between max-w-5xl">
                <li><Link className="font-comforter text-(--green) text-4xl" href="/">{t('Home')}</Link></li>
                <LocaleSwitcher />
                <div className="flex h-full">
                    {[
                        { href: "/about", label: t('AboutMe') },
                        { href: "/contact", label: t('Contact') },
                    ].map(({ href, label }) => (
                        <li key={href} className="h-full">
                            <Link
                                href={href}
                                className="group relative h-full px-6 flex items-center justify-center uppercase"
                            >
                                {label}
                                <span
                                    className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-(--green) transition-transform duration-300 origin-center group-hover:scale-x-100"
                                ></span>
                            </Link>
                        </li>
                    ))}
                    <li className="group h-full"
                    >
                        <button
                            onClick={toggleMenu}
                            className="group relative h-full cursor-pointer px-6 flex items-center justify-center uppercase">
                            {t('Adventures')}
                            <span
                                className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-(--green) transition-transform duration-300 origin-center group-hover:scale-x-100"
                            ></span>
                        </button>
                    </li >
                </div >
                <li><ThemeSwitcher /></li>
            </ul >
            <div className={`hidden md:flex top-24 left-0 z-10 absolute w-full justify-center h-[calc(100vh-6rem)] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                            `}>
                <div className="w-full h-full relative bg-(--background) pt-6 ">
                    <div className="absolute inset-0 z-10 bg-[url('/world-map-money-border.jpg')] bg-cover bg-center opacity-50 dark:opacity-90" />
                    <button onClick={closeMenu} className="h-6 w-6 cursor-pointer absolute z-25 right-6"><IoClose className="scale-200 w-full" /></button>
                    <div className="absolute max-w-5xl w-[95%] z-20 flex gap-6 flex-col left-1/2 -translate-x-1/2">
                        {navbarAdventures.map((continent) => {
                            return <div key={continent.params}>
                                <span className="uppercase text-2xl font-bold">{t(continent.translationKey)}</span>
                                <ul className="flex flex-wrap font-bold text-4xl">
                                    {continent.countries.map((country) => {
                                        return (
                                            <li key={country.params}>
                                                <Link
                                                    href={`/adventures/${continent.params.toLowerCase()}/${country.params}`}
                                                    className="block px-4 py-2 dark:hover:text-(--green) hover:bg-(--green) dark:hover:bg-transparent"
                                                    onClick={closeMenu}
                                                >
                                                    {t(country.translationKey)}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        })}
                    </div >
                </div >
            </div >
        </nav >
    )
}

export default Navbar