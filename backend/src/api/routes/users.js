import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import validInput from '../utils/validInput.js';
import responseError, { callRes } from '../res/response.js';
import { fetchUser } from '../middlewares/fetchUserIDFromToken.js';

// Import database connection
import connection from '../../db/connect.js';

const router = express.Router();

const JWT_SECRET = 'secret_code';

// API đăng ký
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    let role = req.body.role || 'user'

    if (email === undefined || password === undefined) {
        return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
    }
    if (typeof email != 'string' || typeof password != 'string') {
        return callRes(res, responseError.PARAMETER_TYPE_IS_INVALID, null);
    }
    if (!validInput.checkEmail(email)) {
        return callRes(res, responseError.PARAMETER_VALUE_IS_INVALID, null);
    }
    try {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) return callRes(res, responseError.UNKNOWN_ERROR, null);
            if (results.length > 0) return callRes(res, responseError.USER_EXISTED, null);
            bcryptjs.hash(password, 10).then(hashedPassword => {
                connection.query('INSERT INTO users (username, email, password, role) VALUE (?, ?, ?, ?)', [ username, email, hashedPassword, role ], (error) => {
                    if (error) return callRes(res, responseError.UNKNOWN_ERROR, null);
                    return callRes(res, responseError.OK, null);
                });
            });
        });
    } catch (error) {
        return callRes(res, responseError.UNKNOWN_ERROR, error.message);
    }
});

//API đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if(!email  || !password ) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
    if(typeof email != 'string' || typeof password != 'string' ){
        return callRes(res, responseError.PARAMETER_TYPE_IS_INVALID,null);
    }
    
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        if (results.length === 0) return callRes(res, responseError.USER_IS_NOT_VALIDATED, null);
        
        bcryptjs.compare(password, results[0].password, (err, result) => {
            if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
            if (result) {
                const token = jwt.sign(
                    {
                        userId: results[0].id,
                    },
                    JWT_SECRET
                );
                let data = {
                    token,
                    userInfo: JSON.stringify({
                        username: results[0].username,
                        email: results[0].email,
                        avatar: results[0].avatar,
                        role: results[0].role,
                        is_block: results[0].is_block
                    }),
                    role: results[0].role
                }
                return callRes(res, responseError.OK, data);
            } else return callRes(res, responseError.PASSWORD_IS_INCORRECT,null);
        });
    });
});

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: function (req, file, cb) {
        const fileName = 'avatar-' + `${uuidv4()}${path.extname(file.originalname)}`;
        return cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
});

// API cập nhật thông tin người dùng đã đăng nhập
router.put('/change_info_after_signup', fetchUser, upload.single('avatar'), async (req, res) => {
    try {
        const { userId, username, email } = req.body;
        console.log(req.body);
        let avatar;
        if (req.file) {
            if (!validInput.checkImageFile(req.file)) return callRes(res, responseError.PARAMETER_VALUE_IS_INVALID, null);
            avatar = req.file.filename;
        }
        if(username) {
            if (!validInput.checkUserName(username)) return callRes(res, responseError.PARAMETER_VALUE_IS_INVALID, null);
            if(typeof username != 'string') return callRes(res, responseError.PARAMETER_TYPE_IS_INVALID, null);
        }
        if(email) {
            if (!validInput.checkEmail(email)) return callRes(res, responseError.PARAMETER_VALUE_IS_INVALID, null);
            if(typeof email != 'string') return callRes(res, responseError.PARAMETER_TYPE_IS_INVALID, null);
        } 

        // Check if the new username is already taken
        const emailExists = await connection.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
        if (emailExists[0].length) {
            return callRes(res, responseError.USER_EXISTED, null);
        }

        // Update user info
        if(username) await connection.promise().query(`UPDATE users SET username = '${username}' WHERE id = ${userId}`);
        if(email) await connection.promise().query(`UPDATE users SET email = '${email}' WHERE id = ${userId}`);
        if(avatar) await connection.promise().query(`UPDATE users SET avatar = 'http://localhost:4000/images/${avatar}' WHERE id = ${userId}`);

        // Get updated user info
        const [rows] = await connection.promise().query(`SELECT * FROM users WHERE id = ${userId}`);
        const user = rows[0];
        delete user.id;
        delete user.password;

        let data = { user }
        callRes(res, responseError.OK, data);
    } catch (err) {
        console.log(err);
        callRes(res, responseError.UNKNOWN_ERROR, null);
    }
});

export { router };