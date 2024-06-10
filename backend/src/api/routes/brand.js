import express from 'express'

// Import database connection
import connection from '../../db/connect.js';
import responseError, { callRes } from '../res/response.js';

const router = express.Router();

router.post('/add', (req, res) => {
    let brand = req.body;
    let query = 'INSERT INTO brand (name, categoryId, image) VALUES (?, ?, ?)';
    console.log(brand);
    connection.query(query, [
        brand.name,
        brand.categoryId,
        brand.image
    ], (err, results) => {
        console.log(results);
        if (!results) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK);
    })
})

router.get('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    let query = 'SELECT * FROM brand WHERE categoryId = ?';
    connection.query(query, [categoryId], (err, results) => {
        console.log(results);
        if (!results) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    })
})

export { router }