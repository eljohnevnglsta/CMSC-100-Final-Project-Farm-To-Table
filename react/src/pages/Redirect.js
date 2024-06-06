import { Outlet } from "react-router-dom";

const Redirect = () => {
    const user = localStorage.getItem('user')
    const type = localStorage.getItem('type')
    console.log(user);
    if (user)
        return (type === "admin") ? window.location.href = "/admin" : window.location.href = "/home"
    else
        return <Outlet />
}

export default Redirect;