import { Outlet } from "react-router-dom";

const AdminRoutes = () => {
    const type = JSON.parse(localStorage.getItem('type'))
    console.log(type);
    const admin = "admin";

    if(type === admin)
        return <Outlet />
    else
        return window.location.href = "/home"
}

export default AdminRoutes;