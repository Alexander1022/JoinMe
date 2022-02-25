import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function giveMeId(token)
{
    const secret_key = process.env.secret_key;
    var user_id = "";

    try
    {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret_key, (err, user) => {
                if (err) {
                    return ("Error: " + err.message);
                }

                resolve(user.user.id);
            });
        })
    }

    catch (error)
    {
        return("Error: " + error.message);
    }
}

export default giveMeId;