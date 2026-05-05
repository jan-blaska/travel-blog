import clsx from "clsx";

type Props = {
    children: React.ReactNode;
    className?: string;
    topSection?: boolean;
}

export default function Section({ children, className, topSection = false }: Props) {
    return (
        <div className={clsx(
            "flex flex-col gap-6 md:gap-10",
            topSection ? "py-8 md:py-16" : "pt-12 md:pt-20",
            className
        )}>
            {children}
        </div>
    );
}
