type Props = {
    children: React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    reverse?: boolean;
}

export default function ImageNextToText({ children, imageSrc, imageAlt = "", reverse = false }: Props) {
    return (
        <div className={`flex flex-col items-center ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-4 md:gap-6`}>
            <img src={imageSrc} alt={imageAlt} className="w-full md:w-1/2 rounded shadow-md" />
            <div className="w-full md:w-1/2">
                {children}
            </div>
        </div>
    );
}