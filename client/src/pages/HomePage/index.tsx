import './styles.scss'

import useFetchPage from '../../hooks/useFetchPage'

export default function HomePage() {
    const { data, loading, error } = useFetchPage('home')
    return (
        <div>
            Home
        </div>
    )
}
