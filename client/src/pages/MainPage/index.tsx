import './styles.scss'

import { useParams, useNavigate } from 'react-router'
import useFetchPage from '../../hooks/useFetchPage'

export default function MainPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    if (!id) {
        navigate('/')
    }

    const { data, loading, error } = useFetchPage(String(id))

    if (!data) return <div>Error 404</div>

    return (
        <div>

        </div>
    )
}
