import { ContentReference, getImage } from '../../firebase/functions'
import useFetchImage from '../../hooks/useFetchImage'

import './styles.scss'

interface ImageBlockProps {
    value: ContentReference
}

export default function ImageBlock({ value }: ImageBlockProps) {
    const { data, loading, error } = useFetchImage(value)

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!data) return <div>Error 404</div>

    return (
        <figure>
            <img
                src={data?.image}
                title={data?.title}
                alt={data?.title}
            />
        </figure>
    )
}
