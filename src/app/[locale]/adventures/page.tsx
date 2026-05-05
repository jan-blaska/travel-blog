import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import destinations from './destinations';
import Link from 'next/link';
import { SITE_URL, buildAlternates } from '@/lib/metadata';

const titles: Record<string, string> = { en: 'Adventures', cs: 'Dobrodružství', de: 'Abenteuer' };
const descriptions: Record<string, string> = {
  en: 'Explore travel adventures across Europe, Asia, Africa and the Americas.',
  cs: 'Prozkoumejte cestovatelská dobrodružství v Evropě, Asii, Africe a Americe.',
  de: 'Entdecke Reiseabenteuer in Europa, Asien, Afrika und Amerika.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/adventures`,
      languages: buildAlternates('/adventures'),
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/adventures`,
      type: 'website',
      locale,
    },
  };
}

export default async function Adventures({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Adventures' });

    return (
        <main className='overflow-hidden'>
            <div className="bg-[url('/world-map-money-border.jpg')] flex justify-center items-end bg-cover bg-[50%_10%] w-full h-[calc(100vh-var(--navbar-height-mobile))] md:h-[calc(100vh-var(--navbar-height))]">
                <div className="w-[95%] max-w-6xl flex flex-col z-20 gap-2 md:gap-2 font-semibold bg-black/50 p-4 rounded-md mb-16">
                    <span className='text-(--orange) text-4xl md:text-5xl'>{t('Header.Title')}</span>
                    <span className='text-white text-2xl md:text-4xl'>{t('Header.Subtitle')}</span>
                </div>
            </div>

            <section className="w-[95%] max-w-6xl mx-auto py-8">

                <div className="w-full h-full bg-(--background) overflow-y-auto">
                    <div className="w-full z-20 flex gap-6 flex-col py-6 min-h-full">
                        {destinations.map((continent) => {
                            return <div key={continent.params} className="max-w-6xl w-[95%] mx-auto">
                                <span className="uppercase text-md font-bold">{t(continent.translationKey)}</span>
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
                                    {continent.trips && continent.trips.length > 0 && (
                                        <>
                                            <li className="w-full px-4 pt-4 pb-1 text-sm uppercase text-(--orange) font-normal tracking-widest">
                                                — {t('DestinationsList.tripsLabel')} —
                                            </li>
                                            {continent.trips.map((trip) => (
                                                <li key={trip.params}>
                                                    <Link
                                                        href={`/adventures/${continent.params.toLowerCase()}/${trip.params}`}
                                                        className="block px-4 py-2 hover:text-(--green)"
                                                    >
                                                        {t(trip.translationKey)}
                                                    </Link>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        })}
                    </div >
                </div >
            </section>
        </main>
    );
}