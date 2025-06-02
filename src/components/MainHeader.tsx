type Props = {
    children: string,
}

export default function MainHeader({ children }: Props) {
    return (
        <h1 className="relative text-3xl after:w-full md:after:w-2/3 after:h-1 
        after:bg-(--green) after:content-[''] after:absolute after:-bottom-1 after:left-0">{children}</h1>
    )
}