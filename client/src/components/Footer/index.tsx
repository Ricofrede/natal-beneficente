import { useQuery } from 'react-query'

import { Social, getSocials } from '../../firebase/functions'
import './styles.scss'

export default function Footer() {
	const { data, isLoading, error } = useQuery<Social[], Error>(`socials`, () => getSocials())

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error.message}</div>
	if (!data) return <div>Error 404</div>

	function renderSocials() {
		if (!data || !data.length) return [<></>]

		return data?.map((social, index) => {
			return (
				<a
					key={`social-${index}`}
					className="btn btn-link btn-floating btn-lg text-dark m-3"
					href={social.url}
					target="_blank"
					rel="noreferrer"
					role="button"
					data-mdb-ripple-color="dark"
				><i className={`fab fa-3x ${social.iconClass}`}></i></a>
			)
		})
	}

	return (
		<footer className="footer text-center text-white">
			<div className="container pt-4">
				<section className="footer-links-wrapper mb-4">
					{renderSocials()}
				</section>
			</div>

			<div className="footer-text-below text-center text-dark p-3">
				Natal Beneficente - 2022
			</div>
		</footer >
	)
}
