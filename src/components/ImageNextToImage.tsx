import clsx from "clsx";
import { getImageSrc } from "@/lib/image";

type Props = {
    imageOneSrc: string;
    imageTwoSrc: string;
    imageOneAlt?: string;
    imageTwoAlt?: string;
    className?: string;
}

export default function ImageNextToImage({ imageOneSrc, imageTwoSrc, imageOneAlt = "image one", imageTwoAlt = "image two", className }: Props) {
    return (
        <div className={clsx("flex flex-col items-center md:flex-row gap-4 md:gap-6", className)}>
            <img src={getImageSrc(imageOneSrc)} alt={imageOneAlt} className="w-full md:w-1/2 rounded-lg md:rounded-2xl shadow-md" />
            <img src={getImageSrc(imageTwoSrc)} alt={imageTwoAlt} className="w-full md:w-1/2 rounded-lg md:rounded-2xl shadow-md" />
        </div>
    );
}