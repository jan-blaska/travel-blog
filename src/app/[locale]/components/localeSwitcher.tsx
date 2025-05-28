'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const changeLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <div className="flex gap-4">
            <button
                onClick={() => changeLocale('en')}
                className={currentLocale === 'en' ? 'font-bold underline' : ''}
            >
                EN
            </button>
            <button
                onClick={() => changeLocale('cs')}
                className={currentLocale === 'cs' ? 'font-bold underline' : ''}
            >
                CS
            </button>
        </div>
    );
}
