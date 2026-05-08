import { getImageSrc } from "@/lib/image";

type Props = {
    src: string;
    alt?: string;
};

export default function FullWidthImage({ src, alt = "" }: Props) {
    return (
        <img
            src={getImageSrc(src)}
            alt={alt}
            className="w-full rounded-xl shadow-md object-cover"
        />
    );
}
