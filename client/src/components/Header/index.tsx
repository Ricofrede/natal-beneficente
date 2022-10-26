import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getPages, Page } from '../../firebase/functions'
import './styles.scss'

export default function Header() {
	const { data, isLoading, error } = useQuery<Page[], Error>('pages', () => getPages())

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (!data) return <div>Error 404</div>

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Navbar</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					{data.map((link: Page) => (
						<ul className="navbar-nav" key={link.id}>
							<li className="nav-item">
								<Link className="nav-link" to={link.id}>{link.name}</Link>
							</li>
						</ul>))}
				</div>
			</div>
		</nav>
	)
}
