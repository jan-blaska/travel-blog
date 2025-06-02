type Props = {
    imageOneSrc: string;
    imageTwoSrc: string;
    imageOneAlt?: string;
    imageTwoAlt?: string;
}

export default function ImageNextToImage({ imageOneSrc, imageTwoSrc, imageOneAlt = "image one", imageTwoAlt = "image two" }: Props) {
    return (
        <div className={`flex flex-col items-center md:flex-row gap-4 md:gap-6`}>
            <img src={imageOneSrc} alt={imageOneAlt} className="w-full md:w-1/2 rounded-lg md:rounded-2xl shadow-md" />
            <img src={imageTwoSrc} alt={imageTwoAlt} className="w-full md:w-1/2 rounded-lg md:rounded-2xl shadow-md" />
        </div>
    );
}