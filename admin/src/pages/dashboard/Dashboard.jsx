import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [checkboxes, setCheckboxes] = useState([true, false]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalSold, setTotalSold] = useState(0)

  const toggleCheckbox = (id) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox, index) => (index === id ? !checkbox : checkbox))
    );
  };

  const fetchData = async () => {
    await axios.get('http://localhost:4000/product/get')
      .then((res) => {
        if (res.data.status === 200)
          setAllProducts(res.data.results);
      })

    await axios.get('http://localhost:4000/order/all')
      .then((res) => {
        if (res.status === 200)
          setAllOrders(res.data)
      })
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let quantity = 0;
    let sold = 0;
    allProducts.forEach((product) => {
      quantity += product.quantity;
      sold += product.sold;
    })
    setTotalQuantity(quantity);
    setTotalSold(sold);
  }, [allProducts])

  const formatPrice = (price) => {
    let priceString = Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return priceString.replace(/\s/g, '');
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Bảng điều khiển</p>
        <div className="right__cards">
          <Link className="right__card" to="/template/products">
            <div className="right__cardTitle">Số Lượng Sản Phẩm</div>
            <div className="right__cardNumber">{totalQuantity}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/viewsPhoneSale">
            <div className="right__cardTitle">Hoá Đơn Đặt Hàng</div>
            <div className="right__cardNumber">{allOrders.length}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/products">
            <div className="right__cardTitle">Mẫu Điện Thoại</div>
            <div className="right__cardNumber">{allProducts.length}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/chart">
            <div className="right__cardTitle">Thống kê doanh thu</div>
            <div className="right__cardNumber">{totalSold}</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
        </div>
        <div className="right__table">
          <p className="right__tableTitle">Sản phẩm mới</p>
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
                  <th>Trạng thái</th>
                  <th>Sửa</th>
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
                        <td data-label="Trạng thái"></td>
                        <td data-label="Sửa" className="right__iconTable">
                          <Link to={`/template/editProduct/${product.id}`}>
                            <img src={IconEdit} alt="" />
                          </Link>
                        </td>
                      </tr>
                    )
                  }) : 
                  <></>
                }
              </tbody>
            </table>
          </div>
          <Link to="/template/products" className="right__tableMore">
            <p>Xem tất cả sản phẩm</p>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
