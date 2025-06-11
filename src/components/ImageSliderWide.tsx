"use client"

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

type Props = {
    imageList: string[];
    className?: string;
};

export default function ImageSliderWide({ imageList, className }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => prev - 1);
    };

    const goToNext = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const getSlideStyle = (index: number) => {
        if (index === (currentIndex - 1)) {
            return "z-0 scale-80 -translate-x-[100%] opacity-70";
        }
        if (index <= (currentIndex - 1)) {

            return "z-0 scale-80 -translate-x-[120%] opacity-0 pointer-events-none";
        }
        if (index === currentIndex) {
            return "z-10 translate-x-0 opacity-100";
        }
        if (index === (currentIndex + 1)) {
            return "z-0 scale-80 translate-x-[100%] opacity-70";
        }
        if (index >= (currentIndex + 1)) {
            return "z-0 scale-80 translate-x-[120%] opacity-0 pointer-events-none";
        }
    };

    return (
        <div className={clsx("relative w-full flex justify-center items-center", className
        )}>

            <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="z-10 cursor-pointer text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
            >
                <IoIosArrowBack className="w-6 h-6" />
            </button>

            <div className="relative w-[90%] aspect-[3/2] overflow-visible flex justify-center items-center">
                {imageList.map((src, index) => {
                    console.log(index);
                    return (<img
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        className={`absolute w-[95%] h-[95%] md:w-[65%] md:h-[75%] transition-all duration-500 ease-in-out object-cover rounded-xl ${getSlideStyle(index)}`}
                    />)
                }
                )}
            </div>

            <button
                onClick={goToNext}
                disabled={currentIndex === (imageList.length - 1)}
                className="z-10 cursor-pointer text-white bg-black/30 hover:bg-black/50 rounded-full p-2"
            >
                <IoIosArrowForward className="w-6 h-6" />
            </button>
        </div>
    );
}
