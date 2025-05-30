import { useTranslations } from 'next-intl'

export default function About() {
    const t = useTranslations('About');
    const features = t.raw('Features') as { Title: string; Text: string }[];
    const howItStarted = t.raw('HowItStarted') as { Title: string; Content: string[] };

    console.log("How it started:", howItStarted);

    return (
        <main className='overflow-hidden'>
            <div className="relative bg-[url('/about-me/me-sitting-on-handrail.jpg')] bg-cover bg-[50%_10%] w-full h-[calc(100vh-6rem)]">
                <div className="absolute flex flex-col bottom-[20%] left-1/6 md:left-1/4  z-20 gap-2 md:gap-2 font-semibold ">
                    <span className='text-(--orange) text-4xl md:text-5xl'>{t('Header.Title')}</span>
                    <span className='text-white text-2xl md:text-6xl'>{t('Header.Subtitle')}</span>
                </div>
            </div>

            <section className="container w-[95%] max-w-5xl mx-auto pt-8 md:pt-24 pb-8 md:pb-24" aria-labelledby="why-do-I-travel">
                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                    <div className="flex flex-col w-full md:w-1/2 gap-4">
                        <span className="text-2xl font-semibold">{t('WhyITravel.Title')}</span>
                        <span>{t('WhyITravel.Content')}</span>
                    </div>
                    <div className='relative w-full md:w-1/2'>
                        <img
                            src="/about-me/me-jumping-in-desert.png"
                            alt="me jumping in the desert"
                            className='w-full rounded shadow-md'
                        />
                        <div className='hidden md:block absolute w-[calc(100%+5rem)] h-[calc(100%+5rem)] -top-10 left-15 -z-10 bg-(--green) dark:opacity-70' />
                    </div>
                </div>
            </section>

            <hr className="border-gray-200 dark:border-gray-700" aria-hidden="true" />

            <section className="py-12" aria-labelledby="key-features">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="grid gap-6 md:gap-0 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <article
                                key={index}
                                className={`p-6 ${index === 1 ? 'border-gray-400 dark:border-gray-500 md:border-x' : ''}`}
                            >
                                <h3 className="mb-3 text-xl font-semibold">{feature.Title}</h3>
                                <p>{feature.Text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="border-gray-200 dark:border-gray-700" aria-hidden="true" />

            <section className="container w-[95%] max-w-5xl mx-auto pt-8 md:pt-24 pb-8 md:pb-24" aria-labelledby="how-I-started-to-travel">
                <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16">
                    <div className="flex flex-col w-full md:w-1/2 gap-4">
                        <span className="text-2xl font-semibold">{howItStarted.Title}</span>
                        <div className='flex flex-col gap-6'>
                            {howItStarted.Content.map((item, index) => (<span key={index}>{item}</span>))}
                        </div>
                    </div>
                    <img
                        src="/about-me/me-caminito-del-rey.jpg"
                        alt="me jumping in the desert"
                        className='w-full md:w-1/2 rounded shadow-md h-auto max-h-[600px] object-cover'
                    />
                </div>
            </section>
        </main>
    );
}
