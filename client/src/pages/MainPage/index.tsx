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
		id = 'home'
	}

	const { data, isLoading, error } = useQuery<Page, Error>(`page-"${id}`, () => getPage(String(id)))



	function renderContents(): JSX.Element[] {
		if (isLoading) return [<div>Loading...</div>]
		if (error) return [<></>]
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
		<>
			<Hero
				id={id}
				title={data?.name}
				intro={data?.intro}
				imageRef={data?.image}
				textLoading={isLoading}
			/>
			<div className="container contents-wrapper">
				{renderContents()}
			</div>
		</>
	)
}
