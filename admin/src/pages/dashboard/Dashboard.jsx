import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
//import Widget from "../../components/Widget/Widget.jsx";
//import ApexActivityChart from "./components/ActivityChart.jsx";

import meal1 from "../../assets/dashboard/meal-1.svg";
import meal2 from "../../assets/dashboard/meal-2.svg";
import meal3 from "../../assets/dashboard/meal-3.svg";
//import upgradeImage from "../../assets/dashboard/upgradeImage.svg";
//import heartRed from "../../assets/dashboard/heartRed.svg";
// import heartTeal from "../../assets/dashboard/heartTeal.svg";
// import heartViolet from "../../assets/dashboard/heartViolet.svg";
// import heartYellow from "../../assets/dashboard/heartYellow.svg";
// import gymIcon from "../../assets/dashboard/gymIcon.svg";
// import therapyIcon from "../../assets/dashboard/therapyIcon.svg";
// import user from "../../assets/user.svg";
// import statsPie from "../../assets/dashboard/statsPie.svg";

//import s from "./Dashboard.module.scss";

import ImgProduct1 from "../../images/product1.jpg";
import ImgProduct2 from "../../images/product2.jpg";
import ImgProduct3 from "../../images/product3.jpg";
import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";

const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [checkboxes, setCheckboxes] = useState([true, false]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalSold, setTotalSold] = useState(0)

  const toggleCheckbox = (id) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox, index) => (index === id ? !checkbox : checkbox))
    );
  };

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

  const meals = [meal1, meal2, meal3];

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
            <div className="right__cardNumber">12</div>
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
                  <th>Giá SP</th>
                  <th>Đã bán</th>
                  <th>Từ khoá</th>
                  <th>Thời gian</th>
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
                          <img src={ImgProduct1} alt="" />
                        </td>
                        <td data-label="Giá SP">{product.price}</td>
                        <td data-label="Đã bán">{product.sold}</td>
                        <td data-label="Từ khoá">mobile</td>
                        <td data-label="Thời gian">2020-07-13 21:31:05</td>
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
          <Link to="/template/products" className="right__tableMore">
            <p>Xem tất cả sản phẩm</p>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
