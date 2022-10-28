import { useQuery } from 'react-query'

import { Image, getImage, ContentReference } from '../../firebase/functions'
import './styles.scss'


import { Meta } from '../'

interface HeroProps {
    id: string
    title?: string
    intro?: string
    imageRef?: ContentReference
}

export default function Hero({ id, title, intro, imageRef }: HeroProps) {
    const ref: ContentReference = imageRef || { id: '' }
    const { data, isLoading, error } = useQuery<Image, Error>(`hero-${id}`, () => getImage(ref))

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Error 404</div>

    return (
        <>
            <Meta title={title} description={intro} image={data.image} />
            <div
                className="hero p-5 text-center bg-image"
                style={data.image ? {
                    backgroundImage: `url('${data.image}')`
                } : {}}
            >
                <div className="hero-content mask">
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="hero-text-wrapper text-white">
                            <h1 className="mb-3">{title}</h1>
                            <h4 className="mb-3">{intro}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
