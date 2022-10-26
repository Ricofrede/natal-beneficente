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
		<div className="container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="/">Natal Beneficiente</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{data.map((link: Page) => (
							<li className="nav-item active" key={link.id}>
								<Link className="nav-link" to={link.id}>{link.name} <span className="sr-only">(current)</span></Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</div>
	)
}
