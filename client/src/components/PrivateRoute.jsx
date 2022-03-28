import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useContext} from "react";

function PrivateRoute({ isAuthenticated })
{
    const location = useLocation();
    
    return isAuthenticated ? <Outlet /> : <Navigate to = "/signIn" replace state={{ from: location }} />;
}

export default PrivateRoute;