import { Navigate, Outlet, useLocation } from "react-router-dom";
function PrivateRoute({ isAuthenticated })
{
    const location = useLocation();
    return isAuthenticated ? (
    <Outlet /> 
    ):(
        <Navigate to="/" replace state={{ from: location }} />
    );
}

export default PrivateRoute;