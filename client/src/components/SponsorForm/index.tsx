import './styles.scss'

import { CustomModal } from '../'
import { useFormik } from 'formik';

interface SponsorFormProps {
    close: () => void
}

export default function SponsorForm({ close }: SponsorFormProps) {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            gender: '',
            isZap: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    return (
        <CustomModal close={close}>
            <form onSubmit={formik.handleSubmit} className="row">
                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-name">Nome</label>
                    <input
                        type="text"
                        id="sponsor-name"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-email">E-mail</label>
                    <input
                        type="email"
                        id="sponsor-email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-phone">Telefone</label>
                    <input
                        type="tel"
                        id="sponsor-phone"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-gender">Gênero</label>
                    <select
                        id="sponsor-gender"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                    >
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                        <option value="">Prefiro não informar</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="form-check-label" htmlFor="sponsor-zap">
                        Podemos entrar em contato pelo Whatsapp?
                    </label>
                    <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="sponsor-zap"
                        onChange={formik.handleChange}
                        checked={formik.values.isZap}
                    />
                </div>

                <div className="row mb-4 justify-content-around">
                    <button onClick={close} type="button" className="btn btn-secondary mb-2 col-md-3" data-mdb-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-primary mb-2 col-md-3">Cadastrar</button>
                </div>
            </form>
        </CustomModal>
    )
}
