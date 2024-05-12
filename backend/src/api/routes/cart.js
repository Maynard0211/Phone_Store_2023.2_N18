import express, { query } from "express";
import jsonwebtoken from 'jsonwebtoken';
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";


// Import database connection
import connection from "../../db/connect.js";

const router = express.Router();

const JWT_SECRET = 'maBiMat';

// Thêm sản phẩm vào cart của user
router.post("/addToCart", (req, res) => {
    const { token} = req.body;
    
    if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
    // Giải mã token, lấy ra userId
    
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const productId = decoded.productId;
    const quantity = decoded.quantity;
    

    // Kiểm tra tính hợp lệ của dữ liệu (tùy chọn)
    if (!userId || !productId || !quantity) {
      return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
    }
    
    // Tạo câu truy vấn SQL
    const query = `INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)`;
  
    // Thực hiện truy vấn
    connection.query(
      query,
      [userId, productId, quantity],
      (err, results) => {
        console.log(err);
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
      }
    );
  });


//Xem danh sách sản phẩm trong card của user
router.get("/get", async(req, res) => {
  const {token} = req.body;
  // Kiểm tra xem token có tồn tại không
  if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
  // Giải mã token, lấy ra userId  
  
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  const userId = decoded.userId;
  const query = `SELECT name FROM product INNER JOIN users as u WHERE u.id = ${userId} `;
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
});


// Xóa sản phẩm khỏi cart của user
router.delete("/deleteFromCart", async (req, res) => {
  const {token} = req.body;
  
  // Kiểm tra xem token có tồn tại không
  if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
  // Giải mã token, lấy ra userId  
  
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  const userId = decoded.userId;
  const productId = decoded.productId;
  // Kiểm tra tính hợp lệ của dữ liệu
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
});


// Cập nhật số lượng sản phẩm vào cart của user
router.patch("/updateCart", async (req, res) => {
  const {token} = req.body;
  
  // Kiểm tra xem token có tồn tại không
  if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
  // Giải mã token, lấy ra userId  
  
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  const userId = decoded.userId;
  const productId = decoded.productId;
  const quantity = decoded.quantity;
  // Kiểm tra tính hợp lệ của dữ liệu
  if (!userId || !productId || !quantity) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  
  // Tạo câu truy vấn SQL
  const query = ` UPDATE cart SET quantity = '${quantity}' WHERE userId = '${userId}' AND productId = '${productId}'`;
  if (!userId) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  connection.query(
    query,
    [userId,productId,quantity],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
  
});


export { router };
