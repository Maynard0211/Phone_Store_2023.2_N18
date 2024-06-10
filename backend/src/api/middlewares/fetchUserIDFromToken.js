import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import responseError, { callRes } from '../res/response.js';

dotenv.config();
const jwt_secret = 'secret_code';

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return callRes(res, responseError.TOKEN_IS_INVALID, null);
    } else {
        try {
            const data = jwt.verify(token, jwt_secret);
            req.body.userId = data.userId;
            next();
        } catch (error) {
            console.log(error);
            return callRes(res, responseError.TOKEN_IS_INVALID, null);
        }
    }
}

export { fetchUser };