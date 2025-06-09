import Link from "next/link";

type Props = {
    title: string;
    description: string;
    href: string;
    image: string;
}

export default function CardLink(params: Props) {
    return (
        <div className="rounded-3xl w-full h-[500px] bg-yellow-200 dark:bg-yellow-700 shadow-md">
            <Link
                href={params.href}
            >
                <div className="flex flex-col items-center justify-start">
                    <img src={params.image} alt={params.title} className="rounded-t-xl" />
                    <span className="text-2xl pt-2 px-4">{params.title}</span>
                    <span className="text-md px-4">{params.description}</span>
                </div>
            </Link>
        </div>
    )
}