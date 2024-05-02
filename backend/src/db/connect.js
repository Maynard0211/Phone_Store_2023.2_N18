import mysql from 'mysql2';
import responseError from '../api/res/response.js';
import { callRes } from '../api/res/response.js';
import { response } from 'express';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'sa',
    password: '26082003',
   port:'3306',
   database:'phone'
});

connection.connect(error => {
    if (error) {
        console.log('Cannot connect to database:', error);
    }
    else console.log('Connected to database.');
});

export default connection;