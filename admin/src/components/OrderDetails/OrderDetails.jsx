import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState({
    customerName: "",
    phone: "",
    address: "",
    date: "",
    warranty: "",
    description: ""
  });
  const [products, setProducts] = useState([])

  const fetchOrderDetails = async () => {
    await axios.get(`http://localhost:4000/order/get/${orderID}`)
      .then(res => {
        if (res.status === 200) {
          setOrder(res.data);
          setProducts(res.data.orderedProducts)
        }
      })
  }

  useEffect(() => {
    fetchOrderDetails();
  }, [])

  const formatPrice = (price) => {
    let priceString = Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return priceString.replace(/\s/g, '');
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Chi tiết hóa đơn</p>
        <div className="right__formWrapper">
          <h1 >THÔNG TIN KHÁCH HÀNG</h1>
          <div className="right__grid right__grid--row">
            <div className="right__label">Tên khách hàng</div>
            <div className="right__value">{order.customerName}</div>
            <div className="right__label">Số điện thoại</div>
            <div className="right__value">{order.phone}</div>
            <div className="right__label">Địa chỉ</div>
            <div className="right__value">{order.address}</div>
            <div className="right__label">Thời gian đặt hàng</div>
            <div className="right__value">{order.date}</div>
            <div className="right__label">Hạn bảo hành</div>
            <div className="right__value">{order.warranty}</div>
            <div className="right__label">Mô tả</div>
            <div className="right__value">{order.description}</div>
          </div>

          <div style={{marginTop: "30px"}} className="right__tableWrapper">
            <h1>THÔNG TIN SẢN PHẨM</h1>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Giá SP</th>
                  <th>Số lượng</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {
                  products ? 
                  products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="STT">{index + 1}</td>
                        <td data-label="Tên sản phẩm">{product.name}</td>
                        <td data-label="Hình ảnh">
                          <img src={product.image} alt="" />
                        </td>
                        <td data-label="Giá SP">{formatPrice(product.price)}</td>
                        <td data-label="Số lượng">{product.quantity}</td>
                        <td data-label="Tổng tiền">{formatPrice(product.total)}</td>
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

export default OrderDetails;