"use client"

import { useState, useEffect, useRef } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

type Props = {
    imageList: string[];
    className?: string;
}

export default function ImageSlider({ imageList, className }: Props) {
    if (imageList.length === 0) return null;
    const [isAnimating, setIsAnimating] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }, 3000);
    }

    useEffect(() => {
        if (imageList.length === 0) return;

        resetTimeout();

        const animationTimeout = setTimeout(() => {
            setIsAnimating(false);
        }, 1000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, imageList.length]);

    const goToPrevious = () => {
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    const goToNext = () => {
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    return (
        <div className={clsx("relative flex w-full h-full aspect-[3/2] rounded-xl overflow-hidden", className)}>
            {imageList.map((src, index) =>
                <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    className={`w-full h-full object-cover flex-shrink-0 transition-all duration-1000 ease-in-out`}
                />
            )}
            <button
                disabled={isAnimating}
                onClick={() => {
                    goToPrevious();
                }}
                className="z-20 absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full"
            >
                <IoIosArrowBack className="w-6 h-6" />
            </button>
            <button
                disabled={isAnimating}
                onClick={() => {
                    goToNext();
                }}
                className="z-20 absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full"
            >
                <IoIosArrowForward className="w-6 h-6" />
            </button>
            <div className="absolute bottom-2 w-full flex justify-center gap-2 z-20">
                {imageList.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}
