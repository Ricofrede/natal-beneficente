import { useQuery } from 'react-query'
import { getImage, Image, Child, ContentReference } from '../../firebase/functions'
import imgPlaceholder from '../../assets/imgs/people-icon.png'


interface ChildrenListItemProps {
	child: Child
}

export default function ChildrenListItem({ child }: ChildrenListItemProps) {
	const imageRef: ContentReference = child?.picture || { id: '' }
	const { data: image, isLoading, error } = useQuery<Image, Error>(`image-child-list-item-${child.picture?.id}`, () => getImage(imageRef))

	function renderImage() {
		if (isLoading) return <></>
		if (error) return <></>

		const imageSrc = image?.image || imgPlaceholder
		const imageAlt = image?.caption || 'Ícone Criança'
		return (
			<img src={imageSrc} className="img-fluid rounded-start" alt={imageAlt} />
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
