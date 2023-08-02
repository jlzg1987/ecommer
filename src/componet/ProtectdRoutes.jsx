
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';


const ProtectdRoutes = () => {

const token=localStorage.getItem("token")

if(token){
    return <Outlet/>
} else {
    return <Navigate to='/login'/>
}
};
export default ProtectdRoutes;