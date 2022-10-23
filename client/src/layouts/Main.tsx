import useFetchPages from "../hooks/useFetchPages"

interface MainLayoutProps {
    children: JSX.Element | JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { data } = useFetchPages()

    return (
        <>
            <div>
                HEADER
            </div>
            {children}
            <div>
                FOOTER
            </div>
        </>
    )
}
