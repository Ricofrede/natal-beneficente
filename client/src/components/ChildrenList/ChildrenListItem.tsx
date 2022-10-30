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

	return (
		<div className="row g-0">
			<div className="col-md-4">
				{renderImage()}
			</div>
			<div className="col-md-8">
				<div className="card-body">
					<h5 className="card-title">{child.name}</h5>
					<p className="card-text">{child.gender}</p>
					<p className="card-text">{child.intro}</p>
				</div>
			</div>
		</div>
	)
}
