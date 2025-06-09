import clsx from "clsx"

type Props = {
    children: string,
    className?: string
}

export default function MainHeader({ children, className }: Props) {
    return (
        <h1 className={clsx(
            "relative text-3xl after:w-full md:after:w-2/3 after:h-1 after:bg-(--green) after:content-[''] after:absolute after:-bottom-1 after:left-0",
            className
        )}
        >{children}</h1>
    )
}