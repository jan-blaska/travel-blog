"use client"

import { useState, useEffect, useRef } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
    imageList: string[];
}

export default function ImageSlider({ imageList }: Props) {
    if (imageList.length === 0) return null;

    const [currentImage, setCurrentImage] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % imageList.length);
        }, 5000);
    }

    useEffect(() => {
        if (imageList.length === 0) return;

        resetTimeout();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentImage, imageList.length]);

    const goToPrevious = () => {
        setCurrentImage((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    const goToNext = () => {
        setCurrentImage((prev) => (prev + 1) % imageList.length);
    };

    return (
        <div className="relative w-full aspect-[3/2]">
            <img
                src={imageList[currentImage]}
                alt={`Slide ${currentImage + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-lg md:rounded-2xl transition-opacity duration-500"
            />
            <button
                onClick={() => {
                    goToPrevious();
                }}
                className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full"
            >
                <IoIosArrowBack className="w-6 h-6" />
            </button>
            <button
                onClick={() => {
                    goToNext();
                }}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-white flex justify-center items-center w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full"
            >
                <IoIosArrowForward className="w-6 h-6" />
            </button>
            <div className="absolute bottom-2 w-full flex justify-center gap-2 z-20">
                {imageList.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}
