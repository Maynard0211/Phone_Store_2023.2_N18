import express from "express";

// Import database connection
import connection from "../../db/connect.js";
import { fetchUser } from "../middlewares/fetchUserIDFromToken.js";

const router = express.Router();


// API GET: Lấy hoá đơn đặt hàng theo ID
router.get("/get/:id", (req, res) => {
  const orderId = req.params.id;

  connection.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (error, orderResults) => {
      if (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      if (orderResults.length === 0) {
        res.status(404).json({ error: "Không tìm thấy hóa đơn bán" });
      } else {
        const order = orderResults[0];
        connection.query("SELECT p.name, p.image, op.quantity, op.price as price, (op.price * op.quantity) as total FROM orderedproduct op JOIN product p ON op.productId = p.id WHERE orderId = ?",
          [orderId],
          (error, orderedProductResults) => {
            if (error) {
              console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
              res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
              return;
            }
            order.orderedProducts = orderedProductResults;
            let total = 0;
            orderedProductResults.forEach(product => {
              total += product.total;
            })
            res.json({...order, total: total});
          }
        );
      }
    }
  );
});

// API DELETE: Xóa hóa đơn bán theo ID
router.delete("/delete/:id", (req, res) => {
  const orderId = req.params.id;

  connection.query(
    "DELETE FROM orderedproduct WHERE orderId = ?",
    [orderId],
    (error, deleteOrderedProductResults) => {
      if (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      connection.query(
        "DELETE FROM orders WHERE id = ?",
        [orderId],
        (error, deleteOrderResults) => {
          if (error) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            return;
          }

          if (deleteOrderResults.affectedRows === 0) {
            res.status(404).json({ error: "Không tìm thấy hóa đơn bán" });
          } else {
            res.json({ message: "Xóa hóa đơn bán thành công" });
          }
        }
      );
    }
  );
});

// API GET: Lấy toàn bộ hoá đơn bán
router.get("/all", (req, res) => {
  connection.query("SELECT * FROM orders", (error, orderResults) => {
    if (error) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      return;
    }

    const promises = orderResults.map((order) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT SUM(op.quantity * op.price) as total
            FROM orderedproduct op
            WHERE op.orderId = ?
            GROUP BY op.orderId;
          `,
          [order.id],
          (error, result) => {
            if (error) {
              console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
              reject(error);
            } else {
              console.log(result[0]);
              order.total = result[0].total;
              resolve(order);
            }
          }
        );
      });
    });
    
    Promise.all(promises)
    .then((order) => {
      res.json(order);
    })
    .catch((error) => {
      console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
      res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
    });
  });
});

// API POST: Thêm hóa đơn bán mới
router.post("/add", fetchUser, (req, res) => {
  const {
    userId,
    customerName,
    phone,
    address,
    warranty,
    paymentModal,
    paymentStatus,
    description,
    orderedProducts
  } = req.body;
  const query =
  "INSERT INTO orders (userId, customerName, phone, address, warranty, paymentModal, paymentStatus, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  connection.query(
    query,
    [userId, customerName, phone, address, warranty, paymentModal, paymentStatus, description],
    (error, insertOrderResults) => {
      if (error) {
        console.log(insertOrderResults);
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      const orderId = insertOrderResults.insertId;
      const orderedProductValues = orderedProducts.map((item) => [
        orderId,
        item.productId,
        item.price,
        item.quantity
      ]);

      connection.query(
        "INSERT INTO orderedproduct (orderId, productId, price, quantity) VALUES ?",
        [orderedProductValues],
        (error, insertOrderedProductResults) => {
          if (error) {
            console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
            res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
            return;
          }

          // Cập nhật trường 'sold' và giảm trường 'quantity' trong bảng 'product'
          const updateProductQuery =
            "UPDATE product SET sold = sold + ?, quantity = quantity - ? WHERE id = ?";
          orderedProducts.forEach((item) => {
            console.log(item);
            connection.query(
              updateProductQuery,
              [item.quantity, item.quantity, item.productId],
              (error) => {
                if (error) {
                  console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
                  res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
                  return;
                }
              }
            );
          });

          res.json({ message: "Thêm hóa đơn bán thành công" });
        }
      );
    }
  );
});

// API GET: Lấy hoá đơn đặt hàng cho USER
router.get('/get', fetchUser, (req, res) => {
  const userId = req.body.userId;

  connection.query(
    "SELECT * FROM orders WHERE userId = ?",
    [userId],
    (error, orderResults) => {
      if (error) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
        res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        return;
      }

      if (orderResults.length === 0) {
        res.status(404).json({ error: "Không tìm thấy hóa đơn đặt hàng" });
      } else {
        const promises = orderResults.map((order) => {
          return new Promise((resolve, reject) => {
            connection.query(
              `SELECT *, SUM(price * quantity) 
              FROM orderedproduct 
              WHERE orderId = ?
              GROUP BY orderId`,
              [order.id],
              (error, orderedProductResults) => {
                if (error) {
                  console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
                  reject(error);
                } else {
                  order.orderedProducts = orderedProductResults;
                  resolve(order);
                }
              }
            );
          });
        });

        Promise.all(promises)
        .then((orderWithProducts) => {
          res.json(orderWithProducts);
        })
        .catch((error) => {
          console.error("Lỗi truy vấn cơ sở dữ liệu: ", error);
          res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
        });
      }
    }
  );
});

export { router };
