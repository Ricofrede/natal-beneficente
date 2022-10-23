import { Image } from '../../firebase/functions'

import './styles.scss'

interface ImageBlockProps {
    imageObj: Image
}

export default function ImageBlock({ imageObj }: ImageBlockProps) {
    return (
        <figure>
            <img
                src={imageObj?.image}
                title={imageObj?.title}
                alt={imageObj?.title}
            />
        </figure>
    )
}
