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
  console.log(allOrders);
  
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
                  <th>Xoá</th>
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
                        <td data-label="Tổng hóa đơn">{order.total}</td>
                        <td data-label="Chi tiết" className="right__iconTable">
                          <Link to="/template/orderDetails/1">
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
                <tr>
                  <td data-label="STT">1</td>
                  <td data-label="Tên khách hàng"> Phạm Văn A</td>
                  <td data-label="Số điện thoại"> 0123456789</td>
                  <td data-label="Địa chỉ"> Thành phố A</td>
                  <td data-label="Thời gian">2020-07-13 21:31:05</td>
                  <td data-label="Tổng hóa đơn">26.680.000₫</td>
                  <td data-label="Chi tiết" className="right__iconTable">
                    <Link to="/template/orderDetails/1">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">2</td>
                  <td data-label="Tên khách hàng">Lê Văn B</td>
                  <td data-label="Số điện thoại">0246894321</td>
                  <td data-label="Địa chỉ"> Thành phố B</td>
                  <td data-label="Thời gian">2020-07-13 22:19:01</td>
                  <td data-label="Tổng hóa đơn">18.500.000₫</td>
                  <td data-label="Chi tiết" className="right__iconTable">
                    <Link to="/template/orderDetails/1">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">3</td>
                  <td data-label="Tên khách hàng">Lê Văn F</td>
                  <td data-label="Số điện thoại">0246894341</td>
                  <td data-label="Địa chỉ"> Thành phố C</td>
                  <td data-label="Thời gian">2020-08-13 21:19:41</td>
                  <td data-label="Tổng hóa đơn">18.500.000₫</td>
                  <td data-label="Chi tiết" className="right__iconTable">
                    <Link to="/template/orderDetails/1">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
