'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const changeLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    const languages: Record<string, string> = {
        en: "English",
        cs: "Čeština",
    };

    const languageToDisplay = languages[currentLocale] || 'English';

    return (
        <div

            className="relative flex gap-1 items-center cursor-pointer group"
        >
            {languageToDisplay}
            <RiArrowDropDownLine />
            <div className="hidden group-hover:block absolute top-full right-0 bg-(--background) shadow-lg rounded z-10 p-2">
                {Object.entries(languages).map(([locale, name]) => (
                    <button
                        key={locale}
                        onClick={() => changeLocale(locale)}
                        className={`block px-4 py-2 text-sm w-full text-left ${currentLocale === locale ? 'font-bold underline' : ''} hover:font-bold hover:underline`}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
