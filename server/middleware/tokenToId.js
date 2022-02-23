import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function giveMeId(token)
{
    const secret_key = process.env.secret_key;

    try
    {
        jwt.verify(token, secret_key, (err, user) => {
            if (err)
            {
                return("Error: " + err.message);
            }

            return(token + " + " + user);
        });
    }

    catch (error)
    {
        return("Error: " + error.message);
    }
}

export default giveMeId;