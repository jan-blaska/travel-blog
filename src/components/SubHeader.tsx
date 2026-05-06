import clsx from "clsx"

type Props = {
    children: React.ReactNode;
    className?: string;
}

export default function SubHeader({ children, className }: Props) {
    return (
        <span className={clsx("text-lg md:text-xl text-(--green) font-bold", className)}>
            {children}
        </span>
    )
}
