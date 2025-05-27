"use client"

import Link from "next/link"
import ThemeSwitcher from "../themeSwitcher"
import navbarAdventures from "./navbar-adventures"
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden'); // cleanup
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
                <li><Link className="font-comforter text-(--green) text-3xl" href="/">Jan Blaška Travel Blog</Link></li>
                <li><ThemeSwitcher /></li>
            </ul>
            <div
                className={`flex md:hidden top-24 left-0 w-full h-full fixed z-10 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="w-full h-full relative bg-(--background)">
                    <ul className="absolute flex flex-col text-lg w-full z-20 pt-4">
                        <li className="p-2 text-blue-600 dark:text-(--green) uppercase font-bold"><Link href="/about" onClick={closeMenu} >
                            About Me
                        </Link></li>
                        <div className="p-2">
                            <span className="uppercase font-bold">
                                Adventures
                            </span>
                            {navbarAdventures.map((continent) => {
                                return <div key={continent.continent} className="pl-4 py-2">
                                    <span>{continent.continent}</span>
                                    <ul className="flex flex-wrap pl-4 gap-x-2">
                                        {continent.countries.map((country) => {
                                            return (
                                                <li key={country.name}>
                                                    <Link
                                                        href={`/adventures/${continent.continent.toLowerCase()}/${country.linkTo}`}
                                                        className="block text-blue-600 dark:text-(--green) p-1"
                                                    >
                                                        {country.name}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            })}
                        </div>

                        <li className="p-2 text-blue-600 dark:text-(--green) uppercase font-bold"><Link href="/contact" onClick={closeMenu}>
                            Contact
                        </Link></li>
                    </ul>
                    <div className="absolute inset-0 z-10 bg-[url('/world-map-mobile.jpg')] bg-cover bg-center opacity-30 dark:opacity-60" />

                </div>

            </div>

            {/* Desktop menu */}
            <ul className="hidden md:flex w-[95%] items-center justify-between max-w-5xl">
                <li><Link className="font-comforter text-(--green) text-4xl" href="/">Jan Blaška Travel Blog</Link></li>
                <div className="flex h-full">
                    {[
                        { href: "/about", label: "ABOUT ME" },
                        { href: "/contact", label: "CONTACT" },
                    ].map(({ href, label }) => (
                        <li key={href} className="h-full">
                            <Link
                                href={href}
                                className="group relative h-full px-6 flex items-center justify-center"
                            >
                                {label}
                                <span
                                    className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-(--green) transition-transform duration-300 origin-center group-hover:scale-x-100"
                                ></span>
                            </Link>
                        </li>
                    ))}
                    <li className="group h-full" onMouseEnter={() => document.body.classList.add('overflow-hidden')}
                        onMouseLeave={() => document.body.classList.remove('overflow-hidden')}>
                        <span className="group relative h-full px-6 flex items-center justify-center">
                            ADVENTURES
                            <span
                                className="absolute bottom-0 left-0 h-1 w-full scale-x-0 transform bg-(--green) transition-transform duration-300 origin-center group-hover:scale-x-100"
                            ></span>
                        </span>
                        <div className="left-0 z-10 absolute w-full justify-center hidden h-[calc(100vh-6rem)] group-hover:flex transition-transform duration-1000">
                            <div className="w-full h-full relative bg-(--background) pt-6 ">
                                <div className="absolute inset-0 z-10 bg-[url('/world-map-money-border.jpg')] bg-cover bg-center opacity-30 dark:opacity-90" />
                                <div className="absolute max-w-5xl w-[95%] z-20 flex gap-6 flex-col left-1/2 -translate-x-1/2">
                                    {navbarAdventures.map((continent) => {
                                        return <div key={continent.continent}>
                                            <span className="uppercase text-2xl font-bold">{continent.continent}</span>
                                            <ul className="flex flex-wrap font-bold text-4xl">
                                                {continent.countries.map((country) => {
                                                    return (
                                                        <li key={country.name}>
                                                            <Link
                                                                href={`/adventures/${continent.continent.toLowerCase()}/${country.linkTo}`}
                                                                className="block px-4 py-2 dark:hover:text-(--green) hover:bg-(--green) dark:hover:bg-transparent"
                                                            >
                                                                {country.name}
                                                            </Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </li>
                </div>
                <li><ThemeSwitcher /></li>
            </ul>
        </nav >
    )
}

export default Navbar;