import { useQuery } from 'react-query'
import { getImage, Image, Child, ContentReference } from '../../firebase/functions'


interface ChildrenListItemProps {
	child: Child
}

export default function ChildrenListItem({ child }: ChildrenListItemProps) {
	const imageRef: ContentReference = child?.picture || { id: '' }
	const { data: image, isLoading, error } = useQuery<Image, Error>(`image-child-list-item-${child.picture?.id}`, () => getImage(imageRef))

	function renderImage() {
		if (isLoading) return <></>
		if (error) return <></>
		if (!image) return <></>

		return (
			<img src={image.image} className="img-fluid rounded-start" alt={image.caption} />
		)
	}

	let genderIcon
	switch (child.gender) {
		case 'male':
			genderIcon = <i className="fas fa-mars"></i>
			break
		case 'female':
			genderIcon = <i className="fas fa-venus"></i>
			break
		default:
			genderIcon = ''
	}

	return (
		<div className="row g-0">
			<div className="col-4">
				{renderImage()}
			</div>
			<div className="col-8">
				<div className="card-body">
					<h5 className="card-title">{child.name} {genderIcon}</h5>
					<p className="card-text">{child.intro}</p>
				</div>
			</div>
		</div>
	)
}
