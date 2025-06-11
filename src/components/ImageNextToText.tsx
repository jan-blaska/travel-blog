import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    reverse?: boolean;
    className?: string;
}

export default function ImageNextToText({ children, imageSrc, imageAlt = "", reverse = false, className }: Props) {
    return (
        <div className={clsx("flex flex-col items-center gap-4 md:gap-6", className, reverse ? "md:flex-row-reverse" : "md:flex-row")}>
            <img src={imageSrc} alt={imageAlt} className="w-full md:w-1/2 rounded-lg md:rounded-2xl shadow-md" />
            <div className="w-full md:w-1/2">
                {children}
            </div>
        </div>
    );
}