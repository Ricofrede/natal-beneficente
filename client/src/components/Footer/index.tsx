import { useQuery } from 'react-query'

import { Social, getSocials } from '../../firebase/functions'
import './styles.scss'

export default function Footer() {
    const { data, isLoading, error } = useQuery<Social[], Error>(`socials`, () => getSocials())

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data) return <div>Error 404</div>

    function renderSocials() {
        if (!data) return [<></>]

        return data?.map(social => {
            return (
                <a
                    key={social.url}
                    className="btn btn-link btn-floating btn-lg text-dark m-1"
                    href={social.url}
                    target="_blank"
                    role="button"
                    data-mdb-ripple-color="dark"
                ><i className={`fab ${social.iconClass}`}></i></a>
            )
        })
    }

    return (
        <footer className="text-center text-white" style={{ backgroundColor: "#f1f1f1;" }}>
            <div className="container pt-4">
                <section className="mb-4">
                    {renderSocials()}
                </section>
            </div>

            <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                Natal Beneficente - 2022
            </div>
        </footer >
    )
}
