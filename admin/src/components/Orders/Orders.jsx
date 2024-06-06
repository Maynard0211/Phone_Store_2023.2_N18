import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchAllOrders = async () => {
    await axios.get('http://localhost:4000/order/all')
      .then(res => {
        if (res.status === 200) {
          setAllOrders(res.data);
        }
      })
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  const formatPrice = (price) => {
    let priceString = Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return priceString.replace(/\s/g, '');
  }
  
  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Xem hoá đơn</p>
        <div className="right__table">
          <div className="right__tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Thời gian</th>
                  <th>Tổng hóa đơn</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {
                  allOrders ? 
                  allOrders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="STT">{index + 1}</td>
                        <td data-label="Tên khách hàng">{order.customerName}</td>
                        <td data-label="Số điện thoại">{order.phone}</td>
                        <td data-label="Địa chỉ">{order.address}</td>
                        <td data-label="Thời gian">{order.date}</td>
                        <td data-label="Tổng hóa đơn">{formatPrice(order.total)}</td>
                        <td data-label="Chi tiết" className="right__iconTable">
                          <Link to={`/template/orderDetails/${order.id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default Orders;
