"use client"

import { useMemo } from "react";
import dynamic from "next/dynamic";

export default function Home() {
    const Map = useMemo(() => dynamic(
        () => import('./components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <main>
            <video src="video-bg.mp4" autoPlay loop muted className="h-[calc(100vh-6rem)] w-full object-cover z-0" />
            { /* overlay making the video a bit darker */}
            <div className="bg-black absolute opacity-20 w-full h-[calc(100vh-6rem)] top-[6rem] left-0 z-10"></div>

            { /* overlay text on the video */}
            <div className="absolute flex flex-col top-3/5 left-1/4 text-white z-20 gap-6">
                <div className="flex items-end gap-2">
                    <span className="font-semibold font-barlow-condensed text-4xl uppercase">Jan</span>
                    <span className="font-semibold font-barlow-condensed text-6xl uppercase">Blaška</span>
                </div>
                <span className="font-comforter text-6xl">
                    my Travel Journal
                </span>
                <button className="uppercase text-xl px-20 py-6 w-min border-1 cursor-pointer bg-transparent hover:bg-white hover:text-black">Explore</button>
            </div>

            <div className="flex justify-center mt-16">
                <div className="flex flex-col max-w-5xl w-[95%]">
                    <div className="flex flex-col w-full gap-y-8">
                        <span className="text-3xl font-barlow-condensed">Hello! <span className="font-comforter">My name is</span><span className="text-(--green) font-bold px-2">Jan Blaška.</span></span>
                        <span className="py-2 ml-16 pl-6 border-l-8 text-(--orange) text-5xl uppercase font-barlow-condensed ">Welcome TO my travel journal!</span>
                        <span className="text-3xl font-barlow-condensed leading-loose">Make a tea or a coffee, and <span className="bg-[#E2E2E2] p-2 text-black">lets explore with me some adventure 📷.</span></span>
                    </div>
                    <p className="mt-16 text-center">Click on the country you are interested in</p>
                    <div className="h-[600px] z-0">
                        <Map posix={[20, 20]} zoom={2} />
                    </div>
                </div>
            </div>

            <div className="bg-(--orange) flex justify-center py-4 my-16">
                <div className="flex flex-col max-w-5xl w-[95%] justify-center">
                    <div className="flex flex-col items-center">
                        <span className="text-black font-comforter leading-relaxed text-4xl">The journey of a thousand miles begins with one step.</span>
                        <span className="text-black">Lao Tzu</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
