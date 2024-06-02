import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProduct = async () => {
    await axios.get('http://localhost:4000/product/get')
      .then((res) => {
        if (res.data.status === 200)
          setAllProducts(res.data.results);
      })
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const formatPrice = (price) => {
    let priceString = Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return priceString.replace(/\s/g, '');
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Xem sản phẩm</p>
        <div className="right__table">
          <div className="right__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Từ khoá</th>
                  <th>Giá SP</th>
                  <th>Đã bán</th>
                  <th>Số lượng</th>
                  <th>Sửa</th>
                  <th>Xoá</th>
                </tr>
              </thead>
              <tbody>
                {
                  allProducts ? 
                  allProducts.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="STT">{index + 1}</td>
                        <td data-label="Tên sản phẩm">{product.name}</td>
                        <td data-label="Hình ảnh">
                          <img src={product.image} alt="" />
                        </td>
                        <td data-label="Từ khoá">{product.keyword}</td>
                        <td data-label="Giá SP">{formatPrice(product.newPrice)}</td>
                        <td data-label="Đã bán">{product.sold}</td>
                        <td data-label="Số lượng">{product.quantity}</td>
                        <td data-label="Sửa" className="right__iconTable">
                          <Link to={`/template/editProduct/${product.id}`}>
                            <img src={IconEdit} alt="" />
                          </Link>
                        </td>
                        <td data-label="Xoá" className="right__iconTable">
                          <img src={IconDelete} alt="" />
                        </td>
                      </tr>
                    )
                  }) : 
                  <></>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
