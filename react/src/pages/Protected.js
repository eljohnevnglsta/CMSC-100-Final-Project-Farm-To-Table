import { Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = localStorage.getItem('user')
    console.log(user);
    if(user)
        return <Outlet />
    else
        return window.location.href = "/login"
}

export default ProtectedRoutes;