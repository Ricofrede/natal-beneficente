import './styles.scss'

import { CustomModal } from '../'
import { useState } from 'react';

interface SponsorFormProps {
    close: () => void
}

export default function SponsorForm({ close }: SponsorFormProps) {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [isZap, setIsZap] = useState<boolean>(false)

    function handleSubmit(e: any) {
        e.preventDefault()

        alert(JSON.stringify({
            name,
            email,
            phone,
            gender,
            isZap
        }))
    }

    return (
        <CustomModal close={close}>
            <form onSubmit={handleSubmit} className="row sponsor-form">
                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-name">Nome</label>
                    <input
                        type="text"
                        id="sponsor-name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-email">E-mail</label>
                    <input
                        type="email"
                        id="sponsor-email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-phone">Telefone</label>
                    <input
                        type="tel"
                        id="sponsor-phone"
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                    />
                </div>

                <div className="mb-4 col-md-6">
                    <label className="form-label" htmlFor="sponsor-gender">Gênero</label>
                    <select
                        id="sponsor-gender"
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        required
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
                        onChange={(e) => setIsZap(e.target.checked)}
                        checked={isZap}
                    />
                </div>

                <div className="row mb-4 justify-content-around">
                    <button onClick={close} type="button" className="btn btn-secondary mb-2 col-md-3 sponsor-btn__cancel" data-mdb-dismiss="modal">Cancelar</button>
                    <button type="submit" className="btn btn-primary mb-2 col-md-3 sponsor-btn__register">Cadastrar</button>
                </div>
            </form>
        </CustomModal>
    )
}
