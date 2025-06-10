import { useTranslations } from 'next-intl'
import destinations from './destinations';
import Link from 'next/link';

export default function Adventures() {
    const t = useTranslations('Adventures');

    return (
        <main className='overflow-hidden'>
            <div className="bg-[url('/world-map-money-border.jpg')] flex justify-center items-end bg-cover bg-[50%_10%] w-full h-[calc(100vh-var(--navbar-height-mobile))] md:h-[calc(100vh-var(--navbar-height))]">
                <div className="w-[95%] max-w-5xl flex flex-col z-20 gap-2 md:gap-2 font-semibold bg-black/50 p-4 rounded-md mb-16">
                    <span className='text-(--orange) text-4xl md:text-5xl'>{t('Header.Title')}</span>
                    <span className='text-white text-2xl md:text-4xl'>{t('Header.Subtitle')}</span>
                </div>
            </div>

            <section className="w-[95%] max-w-5xl mx-auto py-8">

                <div className="w-full h-full bg-(--background) overflow-y-auto">
                    <div className="w-full z-20 flex gap-6 flex-col py-6 min-h-full">
                        {destinations.map((continent) => {
                            return <div key={continent.params} className="max-w-5xl w-[95%] mx-auto">
                                <span className="uppercase text-2xl font-bold">{t(continent.translationKey)}</span>
                                <ul className="flex flex-wrap font-bold text-4xl">
                                    {continent.countries.map((country) => {
                                        return (
                                            <li key={country.params}>
                                                <Link
                                                    href={`/adventures/${continent.params.toLowerCase()}/${country.params}`}
                                                    className="block px-4 py-2 hover:text-(--green)"
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
            </section>
        </main>
    );
}