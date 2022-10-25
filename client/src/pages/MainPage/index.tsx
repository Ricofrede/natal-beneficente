import './styles.scss'

import { useParams } from 'react-router'
import useFetchPage from '../../hooks/useFetchPage'
import { ContentReference } from '../../firebase/functions'

import {
    TextBlock,
    ImageBlock
} from '../../components'

export default function MainPage() {
    let { id } = useParams()

    if (!id) {
        id = "home"
    }

    const { data, loading, error } = useFetchPage(id)

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
                case 'image':
                    const value: ContentReference = content.value
                    return <ImageBlock value={value} />
                    break;

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
            {data?.image ? (
                <ImageBlock value={data.image} />
            ) : <></>}
            {renderContents()}
        </div>
    )
}
