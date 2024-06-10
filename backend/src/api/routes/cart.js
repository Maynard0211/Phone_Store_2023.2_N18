import express from "express";
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";
import { fetchUser } from '../middlewares/fetchUserIDFromToken.js';

// Import database connection
import connection from "../../db/connect.js";


const router = express.Router();

// Thêm sản phẩm vào cart của user
router.post("/add", fetchUser, async (req, res) => {
  try {  
    const {userId,productId} = req.body;
    // Kiểm tra tính hợp lệ của dữ liệu (tùy chọn)
    if (!userId || !productId ) {
      return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
    }

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng của khách hàng chưa
    const checkQuery = 'SELECT * FROM cart WHERE userId = ? AND productId = ?'
    let productExist = await connection.promise().query(
      checkQuery,
      [userId, productId]
    )

    // Thêm sản phẩm vào giỏ hàng
    if (productExist[0].length > 0) {
      // Sản phẩm có sẵn trong giỏ hàng
      const query = 'UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND productId = ?'
      
      connection.query(
        query,
        [userId, productId],
        (err, results) => {
          console.log(err);
          if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
          return callRes(res, responseError.OK, results);
        }
      )
    } else {
      // Sản phẩm chưa có trong giỏ hàng
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
    }
  } catch (err) {
    callRes(res, responseError.UNKNOWN_ERROR);
  }
    
});


//Xem danh sách sản phẩm trong card của user
router.get("/get", fetchUser, async(req, res) => {
  try {
    const {userId} = req.body;
    const query = `SELECT p.id, p.name, p.image, p.newPrice, p.oldPrice, c.quantity
    FROM product AS p
    JOIN cart AS c ON p.id = c.productid
    JOIN users AS u ON c.userId = u.id
    WHERE u.id = ?`;
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
});

// Xóa sản phẩm khỏi cart của user
router.patch("/delete", fetchUser, async (req, res) => {
  try{
    const {userId, productId} = req.body;
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
});


// Cập nhật số lượng sản phẩm vào cart của user
router.patch("/remove", fetchUser,async (req, res) => {
  try {
    const {userId,productId} = req.body;
    // Kiểm tra tính hợp lệ của dữ liệu
    if (!userId || !productId ) {
      return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
    }

    // Kiểm tra số lượng sản phẩm trong giỏ hàng
    const [product] = await connection.promise().query(`SELECT * FROM cart WHERE userId = ${userId} AND productId = ${productId}`)
    console.log(product[0].quantity);
    
    if (product[0].quantity > 1) {
      // Nếu số lượng sản phẩm lớn hơn 1
      // Tạo câu truy vấn SQL 
      const query = `UPDATE cart SET quantity = quantity - 1 WHERE userId = ? AND productId = ? AND quantity > 0 `;
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
    } else {
      // Nếu số lượng sản phẩm bằng 1 thì xoá khỏi database
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
    }
  } catch (err) {
    callRes(res, responseError.UNKNOWN_ERROR);
  } 
});

export { router };