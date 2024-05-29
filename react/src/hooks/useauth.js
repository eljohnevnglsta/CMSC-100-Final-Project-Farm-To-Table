import { useContext } from "react";
import AuthContext from "../context/authprovider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;