import { useQuery } from "react-query"

import { getPages, Page } from '../firebase/functions'

interface MainLayoutProps {
    children: JSX.Element | JSX.Element[]
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { data, isLoading, error } = useQuery<Page[], Error>('pages', () => getPages())

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Error 404</div>

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
