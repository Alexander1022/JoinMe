import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export default function(req, res, next) 
{
    const token = req.headers['jmtoken'];
    const secret_key = process.env.secret_key;

    if (!token) 
    {
        return res.status(403).json({ message: "User is not authenticated!" });
    }

    try 
    {
        jwt.verify(token, secret_key, (err, user) => {
            if (err) 
            {
                return res.json(err.message);
            }

            req.user = user;
            next();
        });
    } 
    
    catch (error) 
    {
        res.status(401).json({ error: error.message });
    }
};