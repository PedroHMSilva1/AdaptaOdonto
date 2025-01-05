import './style.scss'
import Header from "../../components/Header";
import { Outlet, useLocation} from 'react-router-dom';
export default function AdminMain(){
    const location = useLocation()
    return(
        <div className="admin-main">
            {location.pathname !== "/admin/login"? 

            <Header/>
            
            : 
            
            ''}
            <Outlet />
        </div>
    )
}