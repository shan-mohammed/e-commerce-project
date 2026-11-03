import {Navigate,Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute =({allowedRoles})=> {
    // const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const {loggedInUser} = useAuth();
    
    if(!loggedInUser){
        return <Navigate to="/login" replace />
    }
// check user role 
if(allowedRoles && !allowedRoles.includes(loggedInUser.role)
){
    return <Navigate to="/" replace/>
}


    return <Outlet />
}
export default ProtectedRoute;