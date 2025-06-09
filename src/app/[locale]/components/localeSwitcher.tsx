'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { MdCheck } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const changeLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
        setIsOpen(false);
    };

    const languages: Record<string, { name: string, flag: string }> = {
        en: { name: "English", flag: "🇬🇧" },
        cs: { name: "Čeština", flag: "🇨🇿" },
    };

    const languageToDisplay = languages[currentLocale]?.name || 'English';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className='relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex gap-1 items-center cursor-pointer"
            >
                {languageToDisplay}
                <RiArrowDropDownLine />
            </button>
            {isOpen && <div className="absolute top-full right-0 bg-(--background) shadow-xl rounded z-100 p-2">
                {Object.entries(languages).map(([locale, { name, flag }]) => (
                    <button
                        key={locale}
                        onClick={() => changeLocale(locale)}
                        className={`flex ${currentLocale === locale && "text-(--green)"} gap-2 items-center px-4 py-2 w-full text-left hover:text-(--green) hover:cursor-pointer`}
                    >
                        <span>{flag}</span>
                        <span>{name}</span>
                        {currentLocale === locale && <MdCheck />}
                    </button>
                ))}
            </div>}
        </div>

    );
}
