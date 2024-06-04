import express from "express";
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";

// Import database connection
import connection from "../../db/connect.js";

const router = express.Router();

router.post("/add", (req, res) => {
  let product = req.body;
  let query = `INSERT INTO product (name, categoryId, image, label, oldPrice, newPrice, keyword, quantity, description) 
              values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.image,
      product.label,
      product.oldPrice,
      product.newPrice,
      product.keyword,
      product.quantity,
      product.description,
    ],
    (err, results) => {
      console.log(err);
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
});

router.get("/get", (req, res) => {
  var query = `select p.*, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId=c.id`;
  connection.query(query, (err, results) => {
    console.log(err);
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results)
  });
});

router.get("/getByCategory/:id", (req, res) => {
  const id = req.params.id;
  var query = `select * from product where categoryId=? and status ='true'`;
  connection.query(query, [id], (err, results) => {
    console.log(results);
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results);
  });
});

router.get("/getById/:id", (req, res, next) => {
  const id = req.params.id;
  var query = `select * from product where id=?`;
  connection.query(query, [id], (err, results) => {
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results[0]);
  });
});

router.patch("/update", (req, res) => {
  let product = req.body;
  var query = `update product set 
                name=?, 
                categoryId=?,
                image=?,
                label=?,
                oldPrice=?,
                newPrice=?,
                keyword=?,
                quantity=?,
                sold=?,
                description=?
                where id=?`;
  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.image,
      product.label,
      product.oldPrice,
      product.newPrice,
      product.keyword,
      product.quantity,
      product.sold,
      product.description,
      product.id
    ],
    (err, results) => {
      if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
      return callRes(res, responseError.OK, results);
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  var query = `delete from product where id=?`;
  connection.query(query, [id], (err, results) => {
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results);
  });
});

router.patch("/updateStatus", (req, res) => {
  let user = req.body;
  var query = "update product set status=? where id=?";
  connection.query(query, [user.status, user.id], (err, results) => {
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results);
  });
});

export { router };
