import './style.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Erro from '../../components/Erro'

export default function Login() {

    const url = process.env.REACT_APP_API_URL + "/login"
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    async function logar() {
        await axios.post(url + "/auth", { email, senha })
            .then((res) => {
                let token = res.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('usuario', res.data.login)
                navigate('/admin/main')
            })
            .catch((err) => {
                let erro = err.response.data.erro
                setErro(erro)
            })
    }
    return (
        <div className='login-page'>
            <section className='login'>
                <img className='logo-odonto' alt="" src="/assets/images/AdaptaOdonto_logo.png" />
                <form onSubmit={e => {
                    e.preventDefault()
                    logar()
                }} className='labels'>

                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" name="email" required placeholder='Email'></input>
                    <input value={senha} onChange={e => setSenha(e.target.value)} type="password" id="password" name="password" required placeholder='Senha'></input>
                    <button className='bt-entrar' type="submit">Login</button>
                </form>
            </section>
            {erro.length > 0 ?
                <Erro close={() => setErro('')} mensagem={erro} />
                : ''
            }
        </div>
    )
}