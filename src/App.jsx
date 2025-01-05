
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminMain from './pages/AdminMain';
import ListaAgendamentos from './pages/ListaAgendamentos';
import AdminPaciente from './pages/AdminPaciente';
import Main from './pages/Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' Component={LandingPage}/>
          <Route path='/admin' Component={AdminMain}>
          <Route path='/admin/login' Component={Login}/>
          <Route path='/admin/agendamento' Component={ListaAgendamentos}/>
          <Route path='/admin/paciente' Component={AdminPaciente}/>
          <Route path='/admin/main' Component={Main}></Route>
          <Route path="/admin" element={<Navigate to="/admin/login" replace={true} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
