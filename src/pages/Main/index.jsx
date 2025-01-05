import './style.scss'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Erro from '../../components/Erro'

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div>
        <img src='/assets/images/logo.svg'></img>
        <h2>Adapta Odonto</h2>
      </div>
      <ul>
        <li><NavLink to={"/admin/main"}>Dashboard</NavLink></li>
        <li><NavLink to={"/admin/agendamento"}>Agendamentos</NavLink></li>
        <li><NavLink to={"/admin/paciente"}>Pacientes</NavLink></li>
      </ul>
    </div>
  );
};
const Dashboard = (props) => {
  const [agendamentos, setAgendamentos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const urlA = process.env.REACT_APP_API_URL + "/agendamento"
  const urlP = process.env.REACT_APP_API_URL + "/paciente"
  const token = localStorage.getItem('token')
  useEffect(() => {
    buscarAgendamentos()
    buscarPacientes()
  }, [])
  async function buscarPacientes() {
    axios.get(urlP + "?x-access-token=" + token)
      .then(res => {
        setPacientes(res.data)
      })
      .catch(err => props.erro(err.response.data.erro))
  }
  async function buscarAgendamentos() {
    axios.get(urlA + "/hoje?x-access-token=" + token)
      .then(res => {
        setAgendamentos(res.data)
      })
      .catch(err => props.erro(err.response.data.erro))
  }
  return (
    <div className="dashboard">
      <div className='Agendamento'>
        <div className="section">
          <h2>Agendamentos de Hoje</h2>
          <div className="placeholder">
            {agendamentos.map(a => {
              return (
                <div className='card-left'>
                  <div><img className='svg' src='https://img.icons8.com/?size=100&id=ZQrEWJ7fBM6M&format=png&color=000000'></img>   Paciente: {a.paciente != null ? pacientes.filter(p => p.id === a.paciente)[0]?.nome : 'Não Definido'}
                    <br></br>
                    <img className='svg' src='https://img.icons8.com/?size=100&id=67337&format=png&color=000000'></img>    Data: {a.data.split('-')[2]?.split('T')[0]}/{a.data.split('-')[1]}/{a.data.split('-')[0]}
                    <br></br>
                    <img className='svg' src='https://img.icons8.com/?size=100&id=JNyY8t39Erji&format=png&color=000000'></img>   Hora: {a.hora}
                  </div>
                  <div>
                  <img className='svg' src='https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000'></img>   Status: {a.status}
                    <br></br>
                    <img className='svg' src='https://img.icons8.com/?size=100&id=O6QyDUDTFVlT&format=png&color=000000'></img>   Tratamento: {a.tratamento}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='Paciente'>
        <div className="section">
          <h2>Pacientes</h2>
          <div onClick={() => console.log(pacientes)} className="placeholder">
          {pacientes.map(a => {
              return (
                <div className='card-left'>
                  <div><img className='svg' src='https://img.icons8.com/?size=100&id=ZQrEWJ7fBM6M&format=png&color=000000'></img>   Paciente: {a.nome}
                    <br></br>
                    <img className='svg' src='https://img.icons8.com/?size=100&id=Z5qxNghl0fPa&format=png&color=000000'></img>   Telefone: {a.telefone}
                    <br></br>
                    <img className='svg' src='https://img.icons8.com/?size=100&id=24511&format=png&color=000000'></img>   RG: {a.rg}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const [erro, setErro] = useState('')
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Dashboard erro={err => setErro(err)} />
      </div>
      {erro.length > 0 ?
        <Erro close={() => setErro('')} mensagem={erro} />
        : ''
      }
    </div>
  );
};

export default DashboardLayout;