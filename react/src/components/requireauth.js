import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useauth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    // setAuth({roles: [1]})
    console.log(auth)

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/login" state={{ from: location }} replace />
                : <Navigate to="/root" state={{ from: location }} replace />
    );
}

export default RequireAuth;