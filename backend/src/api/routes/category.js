import express, { query, response } from 'express';
import responseError from '../res/response.js';
import { callRes } from '../res/response.js';

// Import database connection
import connection from '../../db/connect.js';

const router = express.Router();

router.post('/add', (req, res, next) => {
    var category = req.body; 
    var query = "INSERT INTO category (name) values (?)";
    console.log(category);
    connection.query(query,[category.name], (err, results) => {
      console.log(11, results);
      if (!results) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK);
    });
  });
  
router.get('/get', async (req,res)=>{
    var query=`select * from category`;
    connection.query(query, (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
});

router.patch('/update',(req,res)=>{
    let product =req.body
    var query=`update category set name=? where id=?`;
    connection.query(query,[product.name,product.id], (err, results) => {
        if (!err){
            if(results.affectedRows==0){
                return callRes(res, responseError.OK, results);
            }
            return callRes(res, responseError.OK, results);
        } 
        else {return callRes(res, responseError.UNKNOWN_ERROR, null);}
    });
})

export { router };