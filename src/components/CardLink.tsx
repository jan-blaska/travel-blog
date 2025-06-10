import Link from "next/link";
import Image from 'next/image'

type Props = {
    title: string;
    description: string;
    href: string;
    image: string;
    lastUpdated?: string;
}

export default function CardLink({ title, description, href, image, lastUpdated }: Props) {
    return (
        <Link
            href={href}
            className="rounded-md w-full dark:bg-white/10 shadow-xl sm:hover:scale-105 sm:transition-transform sm:duration-300 sm:ease-in-out"
        >
            <div className="flex flex-col items-center justify-start pb-4">
                <Image width={500} height={500} src={image} alt={title} className="rounded-t-md" />
                <span className="text-2xl pb-2 pt-4 px-4 text-(--green)">{title}</span>
                <span className="text-md px-4">{description}</span>
                {lastUpdated && <span className="text-sm px-4 pt-6 font-extralight">Last Updated {lastUpdated}</span>}
            </div>
        </Link>
    )
}