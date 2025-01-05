import axios from 'axios'
import './style.scss'
import { useEffect, useState } from 'react'
import Erro from '../Erro'
export default function FormAgendamento(props){

    const [erro, setErro] = useState('')
    const [notFound, setNotFound] = useState('')
    const [pacienteEncontrado, setPacienteEncontrado] = useState('')
    const [data, setData] = useState(props.agendamento?.data?.split('T')[0])
    const [hora, setHora] = useState(props.agendamento?.hora)
    const [rg, setRG] = useState('')
    const [idPaciente, setIdPaciente] = useState(props.agendamento?.paciente)
    const [tratamento, setTratamento] = useState(props.agendamento?.tratamento)
    const [status, setStatus] = useState(props.agendamento?.status || 'Confirmado')

    const urlP = process.env.REACT_APP_API_URL+"/paciente"
    const token = localStorage.getItem('token')
    const url = process.env.REACT_APP_API_URL+"/agendamento"

    async function salvar(){
        if(idPaciente != undefined || idPaciente != null)
            if(!props.alterar)
                await axios.post(url+"?x-access-token="+token, {data: data?.split("T")[0], hora, status, tratamento, paciente: idPaciente})
                .then(res => props.close())
                .catch(err => setErro(err.response.data.erro))
            else
                await axios.put(url+"/"+props.agendamento.id+"?x-access-token="+token, {data: data.split("T")[0], hora, status, tratamento, paciente: idPaciente})
                .then(res => props.close())
                .catch(err => setErro(err.response.data.erro))
    }

    function cancelar(){

        props.cancel()
    }
    useEffect(() => {
        if(rg)
            buscarPacienteRG()
    }, [rg])

    useEffect(()=> {
        if(idPaciente != undefined)
            buscarPacienteId()
    }, [])
    async function buscarPacienteRG(){
        await axios.get(urlP+"/rg/"+rg+"?x-access-token="+token)
        .then(res => {

            setIdPaciente(res.data.id)
            setPacienteEncontrado("Encontrado: "+res.data.nome)
            setNotFound("")
        })
        .catch(err => {
            setPacienteEncontrado('')
            setNotFound("Paciente não encontrado")
            setIdPaciente(undefined)
        })
    }
    async function buscarPacienteId(){
        await axios.get(urlP+"/"+idPaciente+"?x-access-token="+token)
        .then(res => setRG(res.data.rg))
        .catch(err => console.log(err.response.data.erro))
    }
    return(

        <div className="fundo-form-flutuante">
            <div className='formAgendamento'>

                <div className="logo">
                    <h3>{!props.alterar ? 'Novo Agendamento' : 'Alterar Agendamento'}</h3>
                    <img className="limg" alt="logo" src="/assets/images/logo.svg" />
                    <br />
                </div>

                <div>
                    <label className='titulo-campo'>RG:</label> <input type="text" value={rg} placeholder="RG do Paciente" onChange={e => setRG(e.target.value)}/>
                </div>
                    {notFound != '' && <p className='notfound'>{notFound}</p>}
                    {pacienteEncontrado != '' && <p className='found'>{pacienteEncontrado}</p>}
                <div>
                    <label className='titulo-campo'>Data:</label> <input type="date" value={data} onChange={e => setData(e.target.value)}/>
                </div>

                <div>
                    <label className='titulo-campo'>Hora:</label> <input type="time" value={hora} onChange={e => setHora(e.target.value)}/>
                </div>
      
                <div>
                    <label className='titulo-campo'>Status:</label>
                    <select onChange={e => setStatus(e.target.value)}>
                    <option selected={status == "Confirmado"} value="Confirmado">Confirmado</option>
                    <option selected={status == "Cancelado"} value="Cancelado">Cancelado</option>
                    <option selected={status == "Concluído"} value="Concluído">Concluído</option>
                    </select>
                </div>
                <div>
                    <label className='titulo-area'>Tratamento:</label> 
                    <textarea placeholder="Tratamento" value={tratamento} onChange={e => setTratamento(e.target.value)}/>
                </div>
                    <div className='botoes'>
                    <button className="btn-confirma" onClick={salvar}>
                    {!props.alterar ? 'Agendar' : 'Alterar'}
                    </button>
                    <button className="btn-cancela" onClick={cancelar}>
                    Cancelar
                    </button>
              </div>
                </div>
                {erro &&
                <Erro mensagem={erro} close={() => setErro('')}/>}
            </div>
    )
}