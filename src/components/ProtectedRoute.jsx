import {Navigate,Outlet} from "react-router-dom";

const ProtectedRoute =()=> {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!user){
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}
export default ProtectedRoute;