import express, { query } from "express";
import jsonwebtoken from 'jsonwebtoken';
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";
import { fetchUser } from '../middlewares/fetchUserIDFromToken.js';

// Import database connection
import connection from "../../db/connect.js";


const router = express.Router();

const JWT_SECRET = 'secret_code';

// Thêm sản phẩm vào cart của user
router.post("/add", fetchUser,(req, res) => {
  try {  
  const {userId,productId} = req.body;
  // Kiểm tra tính hợp lệ của dữ liệu (tùy chọn)
    if (!userId || !productId ) {
      return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
    }
    
    // Tạo câu truy vấn SQL
    const query = `INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, 1)`;
  
    // Thực hiện truy vấn
    connection.query(
      query,
      [userId, productId],
      (err, results) => {
        console.log(err);
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
      }
    );
  } catch (err) {
    callRes(res, responseError.UNKNOWN_ERROR);
  }
}
);


//Xem danh sách sản phẩm trong card của user
router.get("/get", fetchUser,async(req, res) => {
try {
  const {userId} = req.body;
  const query = `SELECT p.name
  FROM product AS p
  JOIN cart AS c ON p.id = c.productid
  JOIN users AS u ON c.userId = u.id
  WHERE u.id =  ${userId} `;
  if (!userId) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  connection.query(
    query,
    [userId],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
}
catch (err) {
  callRes(res, responseError.UNKNOWN_ERROR);
}
}
);



// Xóa sản phẩm khỏi cart của user
router.delete("/delete", fetchUser,async (req, res) => {
  try{
  const {userId,productId} = req.body;
  if (!userId || !productId) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  
  // Tạo câu truy vấn SQL
  const query = ` DELETE FROM cart WHERE userId = ? AND productId = ? `;
  if (!userId) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  connection.query(
    query,
    [userId,productId],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
 } catch (err) {
  callRes(res, responseError.UNKNOWN_ERROR);
 }
}
);


// Cập nhật số lượng sản phẩm vào cart của user
router.patch("/remove", fetchUser,async (req, res) => {
  try {
  const {userId,productId} = req.body;
  // Kiểm tra tính hợp lệ của dữ liệu
  if (!userId || !productId ) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  
  // Tạo câu truy vấn SQL
  const query = `UPDATE cart SET quantity = quantity - 1 WHERE productId = '${productId}' AND userId = '${userId}'  AND quantity > 0 `;
  if (!userId) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  connection.query(
    query,
    [userId,productId],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
} catch (err) {
  callRes(res, responseError.UNKNOWN_ERROR);
} 
});


export { router };
