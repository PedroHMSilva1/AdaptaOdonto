import './style.scss'
import axios from "axios";
import { useState } from "react";
import Erro from '../Erro';
export default function FormPaciente(props){

    const [nome, setNome] = useState(props.paciente?.nome || '')
    const [telefone, setTelefone] = useState(props.paciente?.telefone || '')
    const [rg, setRG] = useState(props.paciente?.rg || '')
    const [erro, setErro] = useState('');
    const url = process.env.REACT_APP_API_URL+"/paciente"
    const token = localStorage.getItem('token')

    async function salvar(){
        if(!props.alterar)
            await axios.post(url+"?x-access-token="+token, {nome, rg, telefone})
            .then(res => props.close())
            .catch(err => setErro(err.response.data.erro))
        else
            await axios.put(url+"/"+props.paciente.id+"?x-access-token="+token, {nome, rg, telefone})
            .then(res => props.close())
            .catch(err => setErro(err.response.data.erro))
    }

    function cancelar(){
        props.cancel()
    }
    return(
        <div className="fundo-form-flutuante">
            <div className="formPaciente">
                <div className="logo">
                    <h3>{props.alterar ?'Alterar Paciente':'Novo Paciente'}</h3>
                        <img className="limg" alt="logo" src="/assets/images/logo.svg" />
                    <br />
                </div>
              <div>
                <label className='titulo-campo'>Nome:</label> <input type="text" value={nome} placeholder="Nome" onChange={e => setNome(e.target.value)}/>
              </div>
              <div>
                <label className='titulo-campo'>RG:</label> <input type='text' value={rg} placeholder="RG (Apenas números)" onChange={e => setRG(e.target.value)}/>
              </div>
              <div>
                <label className='titulo-campo'>Telefone:</label><input type="text" value={telefone} placeholder="Telefone" onChange={e => setTelefone(e.target.value)} />
              </div>
              <div className='botoes'>
                <button className="btn-confirma" onClick={salvar}>
                  {!props.alterar ? 'Salvar' : 'Alterar'}
                </button>
                <button className="btn-cancela" onClick={cancelar}>
                  Cancelar
                </button>
              </div>
            </div>
            {erro.length > 0?
                <Erro close={() => setErro('')} mensagem={erro}/>
                :''
      }
        </div>
    )
}