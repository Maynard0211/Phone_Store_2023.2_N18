import express, { query } from "express";
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";


// Import database connection
import connection from "../../db/connect.js";

const router = express.Router();

const JWT_SECRET = 'secret_code';

// Thêm sản phẩm vào cart của user
router.post("/addToCart", (req, res) => {
    const { token, productID, quantity } = req.body;

    if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
    // Giải mã token, lấy ra userId
    try {
      const decoded = jsonwebtoken.verify(token, JWT_SECRET);
      const userID = decoded.userId;
      }
      catch (error) {
        return callRes(res, responseError.TOKEN_IS_INVALID,null);
    }
    

    // Kiểm tra tính hợp lệ của dữ liệu (tùy chọn)
    if (!userID || !productID || !quantity) {
      return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
    }
  
    // Tạo câu truy vấn SQL
    const query = `INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)`;
  
    // Thực hiện truy vấn
    connection.query(
      query,
      [userID, productID, quantity],
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
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    const userID = decoded.userId;
    }
    catch (error) {
      return callRes(res, responseError.TOKEN_IS_INVALID,null);
    }
  
  const query = ` SELECT FROM cart WHERE userId = ? `;
  if (!userID) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }
  connection.query(
    query,
    [userID],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
});


// Xóa sản phẩm khỏi cart của user
router.delete("/deleteFromCart", async (req, res) => {
  const { token, productID } = req.body;
  // Kiểm tra xem token có tồn tại không
  if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
  // Giải mã token, lấy ra userId  
  try {
  const decoded = jsonwebtoken.verify(token, JWT_SECRET);
  const userID = decoded.userId;
  }
  catch (error) {
    return callRes(res, responseError.TOKEN_IS_INVALID,null);
  }
  // Kiểm tra tính hợp lệ của dữ liệu
  if (!userID || !productID) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }

  // Tạo câu truy vấn SQL
  const query = ` DELETE FROM cart WHERE userId = ? AND productId = ? `;

  // Thực hiện truy vấn
  try {
    const [results] = connection.query(query, [userID, productID]);

    // Kiểm tra số lượng hàng bị ảnh hưởng
    if (results.affectedRows === 0) {
      return callRes(res, responseError.NO_DATA_OR_END_OF_LIST_DATA,null);
    }

    // Trả về kết quả thành công
    return callRes(res, responseError.OK, results);
  } catch (error) {
    // Xử lý lỗi
    return callRes(res, responseError.UNKNOWN_ERROR, null);
  } 
});


// Cập nhật số lượng sản phẩm vào cart của user
router.patch("/updateCart", async (req, res) => {
  const { token, productID, quantity } = req.body;

  if (!token) return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH, null);
  // Giải mã token, lấy ra userId  
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    const userID = decoded.userId;
    }
    catch (error) {
      return callRes(res, responseError.TOKEN_IS_INVALID,null);
    }
  // Kiểm tra tính hợp lệ của dữ liệu
  if (!userID || !productID || !quantity) {
    return callRes(res, responseError.PARAMETER_IS_NOT_ENOUGH,null);
  }


  // Tạo câu truy vấn SQL
  const query = ` UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ? `;

  // Thực hiện truy vấn
  try {
    const [results] = connection.query(query, [quantity, userID, productID]);

    // Kiểm tra số lượng hàng bị ảnh hưởng
    if (results.affectedRows === 0) {
      return callRes(res, responseError.NO_DATA_OR_END_OF_LIST_DATA,null);
    }

    // Trả về kết quả thành công
    return callRes(res, responseError.OK, results);
  } catch (error) {
    // Xử lý lỗi
    return callRes(res, responseError.UNKNOWN_ERROR, null);
  } 
});


export { router };
