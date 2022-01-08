import { signOut } from "./api-auth";

const auth = {
    isAuthenticated() 
    {
        if (typeof window == "undefined")
        {
            return false;
        }


        if (sessionStorage.getItem('jwt'))
        {
            return JSON.parse(sessionStorage.getItem('jwt'))
        }
        
        else
        {
            return false;
        }
    },
    authenticate(jwt, cb) 
    {
        if (typeof window !== "undefined")  
        {
            sessionStorage.setItem('jwt', JSON.stringify(jwt))
        }
        cb()
    },
    clearJWT(cb) 
    {
        if (typeof window !== "undefined")
        {
            sessionStorage.removeItem('jwt');
        }
        cb();
    }
}

export default auth;