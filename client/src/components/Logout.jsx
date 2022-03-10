import { Navigate } from "react-router-dom";

function Logout({ setIsAuthenticated })
{
    if(localStorage.jmtoken)
    {
        localStorage.removeItem("jmtoken");
        setIsAuthenticated(false);
    }

    return (
        <Navigate to="/" />
    );
}

export default Logout;