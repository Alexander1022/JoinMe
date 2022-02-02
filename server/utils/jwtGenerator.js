import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function jwtGenerator(user_id) 
{
    const payload = {
      user: 
      {
        id: user_id
      }
    };
    return jwt.sign(payload, process.env.secret_key, { expiresIn: "24h" });
}

export default jwtGenerator;