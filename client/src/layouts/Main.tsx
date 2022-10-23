import useFetchPages from "../hooks/useFetchPages"

interface MainLayoutProps {
    children: JSX.Element | JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { data } = useFetchPages()

    return (
        <div className='container'>
            <div className='row'>
                HEADER
            </div>
            {children}
            <div className="row">
                FOOTER
            </div>
        </div>
    )
}
