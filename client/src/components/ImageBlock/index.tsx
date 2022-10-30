import { useQuery } from 'react-query'

import { ContentReference, getImage, Image } from '../../firebase/functions'

import './styles.scss'

interface ImageBlockProps {
    value: ContentReference
}

export default function ImageBlock({ value }: ImageBlockProps) {
    const { data, isLoading, error } = useQuery<Image, Error>(`image-${value.id}`, () => getImage(value))

    if (isLoading) return <></>
    if (error) return <></>
    if (!data) return <></>

    return (
        <figure className="d-flex justify-content-center">
            <img
                src={data?.image}
                title={data?.title}
                alt={data?.title}
                className="img-fluid shadow-2-strong"
            />
        </figure>
    )
}
