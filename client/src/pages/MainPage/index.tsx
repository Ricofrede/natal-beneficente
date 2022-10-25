import './styles.scss'

import { useParams } from 'react-router'
import { useQuery } from 'react-query'

import { ContentReference, getPage, Page } from '../../firebase/functions'
import {
    TextBlock,
    ImageBlock,
    Hero
} from '../../components'

export default function MainPage() {
    let { id } = useParams()

    if (!id) {
        id = "home"
    }

    const { data, isLoading, error } = useQuery<Page, Error>(`page-"${id}`, () => getPage(String(id)))

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error?.message}</div>
    if (!data) return <div>Error 404</div>

    function renderContents(): JSX.Element[] {
        if (!data?.content?.length) return [<></>]

        return data.content.map((content, index) => {
            switch (content.type) {
                case 'text':
                    return <TextBlock key={`page-content-${index}`} text={String(content.value)} />
                    break;
                case 'image':
                    const value: ContentReference = content.value
                    return <ImageBlock key={`page-content-${index}`} value={value} />
                    break;

                default:
                    return <></>
                    break;
            }
        })
    }

    return (
        <div>
            <Hero id={id} title={data.name} intro={data.intro} imageRef={data.image} />
            {renderContents()}
        </div>
    )
}
