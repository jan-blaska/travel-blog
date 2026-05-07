import clsx from "clsx";
import { getImageSrc } from "@/lib/image";

type ImageWidth = "narrow" | "medium" | "wide";
type ImageFit = "cover" | "contain";
type ImagePosition = "top" | "center" | "bottom";

type Props = {
    children: React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    reverse?: boolean;
    className?: string;
    imageWidth?: ImageWidth;
    fit?: ImageFit;
    maxHeight?: string;
    imagePosition?: ImagePosition;
}

const widthClasses: Record<ImageWidth, { image: string; text: string }> = {
    narrow: { image: "md:w-1/3", text: "md:w-2/3" },
    medium: { image: "md:w-1/2", text: "md:w-1/2" },
    wide:   { image: "md:w-2/3", text: "md:w-1/3" },
};

const positionClasses: Record<ImagePosition, string> = {
    top: "object-top",
    center: "object-center",
    bottom: "object-bottom",
};

export default function ImageNextToText({
    children, imageSrc, imageAlt = "", reverse = false, className,
    imageWidth = "medium", fit = "cover", maxHeight, imagePosition,
}: Props) {
    const widths = widthClasses[imageWidth];
    return (
        <div className={clsx("flex flex-col items-center gap-4 md:gap-6", className, reverse ? "md:flex-row-reverse" : "md:flex-row")}>
            <img
                src={getImageSrc(imageSrc)}
                alt={imageAlt}
                style={maxHeight ? { maxHeight } : undefined}
                className={clsx(
                    "w-full rounded-lg md:rounded-2xl shadow-md",
                    widths.image,
                    fit === "cover" && "object-cover",
                    imagePosition && positionClasses[imagePosition],
                )}
            />
            <div className={clsx("w-full", widths.text)}>
                {children}
            </div>
        </div>
    );
}
