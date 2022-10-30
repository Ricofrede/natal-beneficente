import { useQuery } from 'react-query'
import { getImage } from '../../firebase/functions'


export default function ChildrenListItem({ child }) {
	const { data: image, isLoading, error } = useQuery<Image, Error>(`image-${child.picture?.id}`, () => getImage(child.picture))

	function renderImage() {
		if (isLoading) return [<></>]
		if (error) return [<></>]
		if (!image) return [<></>]

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
			<div className="col-md-4">
				{renderImage()}
			</div>
			<div className="col-md-8">
				<div className="card-body">
					<h5 className="card-title">{child.name} {genderIcon}</h5>
					<p className="card-text">{child.intro}</p>
				</div>
			</div>
		</div>
	)
}
