import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute({ isAuthenticated })
{ 
    console.log(isAuthenticated);
    
    return isAuthenticated ? <Outlet /> : <Navigate to = "/signIn"  />;
}

export default PrivateRoute;