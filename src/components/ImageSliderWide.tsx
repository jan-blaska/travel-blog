"use client"

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

type Props = {
    imageList: string[];
    className?: string;
};

export default function ImageSliderWide({ imageList = [], className }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className={clsx("relative flex w-full aspect-[3/2] rounded-xl overflow-hidden", className)}>
            {imageList.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0 transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                />
            ))}

            <button
                onClick={() => setCurrentIndex(prev => prev - 1)}
                disabled={currentIndex === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-white bg-black/30 hover:bg-black/50 disabled:opacity-30 rounded-full p-3"
            >
                <IoIosArrowBack className="w-6 h-6" />
            </button>

            <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={currentIndex === imageList.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-white bg-black/30 hover:bg-black/50 disabled:opacity-30 rounded-full p-3"
            >
                <IoIosArrowForward className="w-6 h-6" />
            </button>

            <div className="absolute bottom-3 w-full flex justify-center gap-2 z-10">
                {imageList.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
                    />
                ))}
            </div>
        </div>
    );
}
