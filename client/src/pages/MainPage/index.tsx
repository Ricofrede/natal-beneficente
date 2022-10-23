import './styles.scss'

import { useParams } from 'react-router'
import useFetchPage from '../../hooks/useFetchPage'

import {
    TextBlock,
    ImageBlock
} from '../../components'

export default function MainPage() {
    let { id } = useParams()

    if (!id) {
        id = 'home'
    }

    const { data, loading, error } = useFetchPage(String(id)) // TODO: Deal with this TS

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!data) return <div>Error 404</div>

    function renderContents(): JSX.Element[] {
        if (!data?.content?.length) return [<></>]

        return data.content.map(content => {
            switch (content.type) {
                case 'text':
                    return <TextBlock text={String(content.value)} />
                    break;
                // case 'image':
                //     return <ImageBlock imageObj={content.value} />
                //     break;

                default:
                    return <></>
                    break;
            }
        })
    }

    return (
        <div>
            <h1>{data.name}</h1>
            <h3>{data.intro}</h3>
            <figure>
                <img
                    src={data.image?.image}
                    title={data.image?.title}
                    alt={data.image?.title}
                />
            </figure>
            {renderContents()}
        </div>
    )
}
