interface MainLayoutProps {
    children: JSX.Element | JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
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
