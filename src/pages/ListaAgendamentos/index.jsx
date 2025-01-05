import Erro from '../../components/Erro';
import './style.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import FormAgendamento from '../../components/FormAgendamento';
export default function ListaAgendamentos() {
  const [paciente, setPacientes] = useState([]);
  const [agendamentosAll, setAgendamentosAll] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [isNewAgendamento, setIsNewAgendamento] = useState(true);
  const [agendamentoEdit, setAgendamentoEdit] = useState(false);
  const [buscaRgOuNome, setBuscaRgOuNome] = useState('')
  const [buscaData, setData] = useState('')
  const [erro, setErro] = useState('')
  const [formAgend, setFormAgend] = useState(false)
  const [altFormAgend, setAltFormAgend] = useState(false)
  const [agendAlterado, setAgendAlterado] = useState('')

  const token = localStorage.getItem('token')
  const url = process.env.REACT_APP_API_URL+"/agendamento"
  const urlP = process.env.REACT_APP_API_URL+"/paciente"

  function filtro(){
    if(buscaData != '' && buscaRgOuNome == ''){//Se tem pesquisa por data e não por nome ou rg
      setAgendamentos(agendamentosAll.filter(a => a.data.split('T')[0] == buscaData))
    }
    else{ // Se tem pesquisa por rg/nome mas não por data
      if(/\d/.test(buscaRgOuNome))
        setAgendamentos(agendamentosAll.filter(a => paciente.filter(p => p.id == a.paciente)[0].rg.toLowerCase().includes(buscaRgOuNome.toLowerCase())))
      else
      setAgendamentos(agendamentosAll.filter(a => paciente.filter(p => p.id == a.paciente)[0].nome.toLowerCase().includes(buscaRgOuNome.toLowerCase())))
    }
    if(buscaRgOuNome != '' && buscaData != ''){ // Se tem as duas pesquisas
      if(/\d/.test(buscaRgOuNome))
        setAgendamentos(agendamentosAll.filter(a => paciente.filter(p => p.id == a.paciente)[0].rg.toLowerCase().includes(buscaRgOuNome.toLowerCase()) && a.data.split('T')[0] == buscaData))
      else
      setAgendamentos(agendamentosAll.filter(a => paciente.filter(p => p.id == a.paciente)[0].nome.toLowerCase().includes(buscaRgOuNome.toLowerCase()) && a.data.split('T')[0] == buscaData))
    }

    if(buscaData == '' && buscaRgOuNome == '') //Sem filtro
      setAgendamentos(agendamentosAll)
    
  }

  async function salvar() {
    setOpenPopup(false);
    if (isNewAgendamento) {
      console.log("Novo Agendamento salvo!");
    } else {
      console.log("Agendamento alterado!");
    }
  }

  useEffect(() => {
    buscarAgendamentos()
    buscarPacientes()
  }, []);

  useEffect(() => {

    filtro()
  }, [buscaData, buscaRgOuNome]);

  async function buscarAgendamentos(){
    axios.get(url+"?x-access-token="+token)
      .then(res => {
        setAgendamentosAll(res.data)
        setAgendamentos(res.data)
      })
      .catch(err => setErro(err.response.data.erro))
  }

  async function buscarPacientes(){
    axios.get(urlP+"?x-access-token="+token)
    .then(res => {
      setPacientes(res.data)
    })
    .catch(err => setErro(err.response.data.erro))
  }



  async function apagarAgendamento(id){
    axios.delete(url+"/"+id+"?x-access-token="+token)
      .then(res => {
        setAgendamentosAll(agendamentosAll.filter(a => a.id !== id))
        setAgendamentos(agendamentos.filter(a => a.id !== id))
      })
      .catch(err => setErro(err.response.data.erro))
  }

  return (
    <div className="agendamento-main">
      <NavLink to="/admin/main" className="btn-dashboard"><img className='img-retorno' src="/assets/images/seta-circulo-esquerda.png"/>Dashboard</NavLink>
      <div className='lista-agendamento'>
        <h2>Agendamentos</h2>
        <div className="search-bar">
          <input type="text" placeholder="Busca por Nome ou RG do paciente" value={buscaRgOuNome} onChange={e => setBuscaRgOuNome(e.target.value)}/>

          <input type="date" value={buscaData} onChange={e => setData(e.target.value)}/>

          <button className='button-novo' onClick={() => setFormAgend(true)}>+ Novo</button>
        </div>

        <div className="appointments-container">
          <div className="cards-container">
            {agendamentos.map((agendamento) => 
                <div key={agendamento.id} className="card">
                  <div className="card-left">
                    <div>
                      <strong> Paciente: </strong> {paciente.filter(p => p.id == agendamento.paciente)[0]?.nome}
                    </div>
                    <div>
                      <strong> Data da Consulta: </strong> {agendamento.data.split('-')[2]?.split('T')[0]}/{agendamento.data.split('-')[1]}/{agendamento.data.split('-')[0]}
                    </div>
                    <div>
                      <strong> Status: </strong> {agendamento.status}
                    </div>
                  </div>
                  <div className="card-center">
                    <div>
                      <strong>RG:</strong> {paciente.filter(p => p.id == agendamento.paciente)[0]?.rg}
                    </div>
                    <div>
                      <strong>Horário:</strong> {agendamento.hora}
                    </div>
                    <div>
                      <strong>Tratamento:</strong> {agendamento.tratamento}
                    </div>
                  </div>
                  <div className="card-right">
                    <button className="edit-btn" onClick={() => {
                        setAgendAlterado(agendamento)
                        setAltFormAgend(true)
                        setFormAgend(true)
                      }}>Editar</button>
                    <button className="delete-btn" onClick={() => apagarAgendamento(agendamento.id)}>Apagar</button>
                  </div>
                </div>
              
            )}
          </div>
        </div>
        {/*-----------------------------------------POPUP---------------------------------------------------------------*/}

      </div>
        {formAgend && 
          <FormAgendamento agendamento={agendAlterado} alterar={altFormAgend} cancel={() => {
            setFormAgend(false)
            setAltFormAgend(false)
            setAgendAlterado({})
          }} close={() => {
            setFormAgend(false)
            buscarAgendamentos()
            setAltFormAgend(false)
            setAgendAlterado({})
          }}/>
      }
      {erro.length > 0?
                <Erro close={() => setErro('')} mensagem={erro}/>
                :''
      }
    </div>
  );
}
