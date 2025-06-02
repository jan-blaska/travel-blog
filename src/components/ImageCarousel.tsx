"use client"

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
    imageList: string[];
};

export default function ImageCarousel({ imageList }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
    };

    const getSlideStyle = (index: number) => {
        const total = imageList.length;

        if (index === currentIndex) {
            return "z-10 scale-60 left-1/2 -translate-x-1/2 opacity-100";
        }

        if (index === (currentIndex - 1 + total) % total) {
            return "z-0 scale-40 left-[15%] -translate-x-1/2 opacity-70";
        }

        if (index === (currentIndex + 1) % total) {
            return "z-0 scale-40 left-[85%] -translate-x-1/2 opacity-70";
        }

        return "opacity-0 scale-50 pointer-events-none left-1/2 -translate-x-1/2";
    };

    return (
        <div className="relative w-full flex justify-center items-center">

            <button
                onClick={goToPrevious}
                className="absolute cursor-pointer left-4 z-20 text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
            >
                <IoIosArrowBack className="w-6 h-6" />
            </button>

            <div className="relative w-[90%] aspect-[3/2] overflow-visible flex justify-center items-center">
                {imageList.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className={`absolute top-0 transition-all duration-500 ease-in-out w-[60%] h-full object-cover rounded-xl ${getSlideStyle(index)}`}
                    />
                ))}
            </div>

            <button
                onClick={goToNext}
                className="absolute cursor-pointer right-4 z-20 text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
            >
                <IoIosArrowForward className="w-6 h-6" />
            </button>
        </div>
    );
}
