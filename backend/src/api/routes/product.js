import express from "express";
import responseError from "../res/response.js";
import { callRes } from "../res/response.js";

// Import database connection
import connection from "../../db/connect.js";

const router = express.Router();

router.post("/add", (req, res) => {
  let product = req.body;
  let query = `INSERT INTO product (name, categoryId, brandId, image, label, oldPrice, newPrice, keyword, quantity, description) 
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.brandId,
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
  var query = `SELECT p.*, c.name as categoryName, b.name as brandName
              FROM product as p
              JOIN category as c ON p.categoryId = c.id
              JOIN brand as b ON p.brandId = b.id`;
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

router.get("/getByBrand/:id", (req, res) => {
  const id = req.params.id;
  var query = `select * from product where brandId=? and status ='true'`;
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
                brandId=?,
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
      product.brandId,
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
  let product = req.body;
  var query = "update product set status=? where id=?";
  connection.query(query, [product.status, product.id], (err, results) => {
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results);
  });
});

router.get("/new", (req, res) => {
  var query = `SELECT * FROM product WHERE label='new'`;
  connection.query(query, (err, results) => {
    console.log(err);
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results)
  });
});

router.get("/sales/:category", (req, res) => {
  let category = req.params.category;
  var query = `SELECT * FROM product WHERE label='sales' AND categoryId=?`;
  connection.query(query, [category], (err, results) => {
    if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
    return callRes(res, responseError.OK, results);
  });
});

export { router };
