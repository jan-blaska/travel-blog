"use client"

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('HomePage');

    const Map = useMemo(() => dynamic(
        () => import('./components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <main>
            <video src="/video-bg.mp4" autoPlay loop muted className="h-[calc(100vh-var(--navbar-height-mobile))] md:h-[calc(100vh-var(--navbar-height))] w-full object-cover z-0" />
            { /* overlay making the video a bit darker */}
            <div className="bg-black absolute opacity-20 w-full h-[calc(100vh-var(--navbar-height-mobile))] md:h-[calc(100vh-var(--navbar-height))] top-(--navbar-height-mobile) md:top-(--navbar-height) left-0 z-10"></div>

            { /* overlay text on the video */}
            <div className="absolute flex flex-col bottom-[20%] left-1/6 md:left-1/4 text-white z-20 gap-2 md:gap-6">
                <div className="flex items-end gap-2">
                    <span className="font-semibold font-barlow-condensed text-2xl md:text-4xl uppercase">{t('Title.Name')}</span>
                    <span className="font-semibold font-barlow-condensed text-4xl md:text-6xl uppercase">{t('Title.Surname')}</span>
                </div>
                <span className="font-comforter text-4xl md:text-6xl">
                    {t('Title.Text')}
                </span>
                <button className="uppercase text-xl px-10 md:px-20 py-3 md:py-6 w-min border-1 cursor-pointer bg-transparent hover:bg-white hover:text-black">{t('Title.ButtonText')}</button>
            </div>

            <div className="flex justify-center mt-8 md:mt-16">
                <div className="flex flex-col max-w-5xl w-[95%]">
                    <div className="flex flex-col w-full gap-y-6 md:gap-y-8">
                        <span className="text-2xl md:text-3xl font-barlow-condensed">{t('Greeting.Hello')}<span className="font-comforter">{t('Greeting.MyNameIs')}</span><span className="text-(--green) font-bold px-2">{t('Greeting.JanBlaska')}</span></span>
                        <span className="py-2 ml-16 pl-6 border-l-8 text-(--orange) text-4xl md:text-5xl uppercase font-barlow-condensed ">{t('Greeting.Welcome')}</span>
                        <span className="text-2xl md:text-3xl font-barlow-condensed leading-loose">{t('Greeting.MakeATea')}<span className="bg-[#E2E2E2] p-2 text-black">{t('Greeting.LetsExplore')}</span></span>
                    </div>
                    <p className="mt-8 md:mt-16 text-center">{t('Map.Prompt')}</p>
                    <div className="h-[600px] z-0">
                        <Map posix={[20, 20]} zoom={2} />
                    </div>
                </div>
            </div>

            <div className="bg-(--orange) flex justify-center py-4 my-16">
                <div className="flex flex-col max-w-5xl w-[95%] justify-center">
                    <div className="flex flex-col items-center text-black">
                        <span className="font-comforter leading-relaxed text-3xl md:text-4xl">{t('Citation.Text')}</span>
                        <span>{t('Citation.Author')}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
