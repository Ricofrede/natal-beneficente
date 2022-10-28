import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getPages, Page } from '../../firebase/functions'
import './styles.scss'

export default function Header() {
	const { data, isLoading, error } = useQuery<Page[], Error>('pages', () => getPages())

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (!data) return <div>Error 404</div>

	function renderMenu() {
		if (!data || !data.length) return [<></>]

		return data.map(page => {

			const link = page.id === 'home' ? '/' : page.id
			return (
				<ul className="navbar-nav" key={page.id}>
					<li className="nav-item">
						<Link className="nav-link" to={link}>{page.shortName}</Link>
					</li>
				</ul>
			)
		})
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Natal Beneficiente</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{renderMenu()}
				</div>
			</div>
		</nav>
	)
}
