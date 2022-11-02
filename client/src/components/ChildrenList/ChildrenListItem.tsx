import { useQuery } from 'react-query'
import { getImage, Image, Child, ContentReference } from '../../firebase/functions'
import { SponsorForm } from '../'
import { useState } from 'react'
import imgPlaceholder from '../../assets/imgs/people-icon.png'


interface ChildrenListItemProps {
	child: Child
}

export default function ChildrenListItem({ child }: ChildrenListItemProps) {
	const [modalOpen, setModalOpen] = useState<boolean>(false)

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
			genderIcon = <i className="fas fa-mars" style={{ color: 'blue' }}></i>
			break
		case 'female':
			genderIcon = <i className="fas fa-venus" style={{ color: 'pink' }}></i>
			break
		default:
			genderIcon = ''
	}

	return (
		<>
			{modalOpen ? <SponsorForm close={() => setModalOpen(false)} childId={child.id} childName={child.name} /> : <></>}
			<div className="row g-0">
				<div className="col-4">
					{renderImage()}
				</div>
				<div className="col-8">
					<div className="card-body">
						<h5 className="card-title">{child.name} {genderIcon}</h5>
						<p className="card-text">{child.intro}</p>
						{!child.sponsor ? (
							<button
								onClick={() => setModalOpen(true)}
								className="btn btn-primary"
							>Apadrinhe esta criança!</button>
						) : (
							<span>Apadrinhado(a)!</span>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
