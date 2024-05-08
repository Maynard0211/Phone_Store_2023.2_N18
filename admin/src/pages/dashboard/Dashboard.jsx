import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Col,
  Row,
  Progress,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
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
  const [checkboxes, setCheckboxes] = useState([true, false]);

  const toggleCheckbox = (id) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox, index) => (index === id ? !checkbox : checkbox))
    );
  };

  const meals = [meal1, meal2, meal3];

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Bảng điều khiển</p>
        <div className="right__cards">
          <Link className="right__card" to="/template/products">
            <div className="right__cardTitle">Sản Phẩm</div>
            <div className="right__cardNumber">72</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/createPhoneSale">
            <div className="right__cardTitle">Tạo hoá đơn bán</div>
            <div className="right__cardNumber">12</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/createEnterPhone">
            <div className="right__cardTitle">Nhập điện thoại</div>
            <div className="right__cardNumber">4</div>
            <div className="right__cardDesc">Xem Chi Tiết</div>
          </Link>
          <Link className="right__card" to="/template/chart">
            <div className="right__cardTitle">Thống kê doanh thu</div>
            <div className="right__cardNumber">72</div>
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
                <tr>
                  <td data-label="STT">1</td>
                  <td data-label="Tên sản phẩm"> iPhone 14 Pro Max 128GB</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct1} alt="" />
                  </td>
                  <td data-label="Giá SP">26.680.000₫</td>
                  <td data-label="Đã bán">1</td>
                  <td data-label="Từ khoá">mobile</td>
                  <td data-label="Thời gian">2020-07-13 21:31:05</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/template/editProduct/iphone14-pro-max-128gb">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">2</td>
                  <td data-label="Tên sản phẩm">iPhone 13 Pro Max 128GB</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct2} alt="" />
                  </td>
                  <td data-label="Giá SP">18.500.000₫</td>
                  <td data-label="Đã bán">0</td>
                  <td data-label="Từ khoá">mobi</td>
                  <td data-label="Thời gian">2020-07-13 22:19:01</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/template/editProduct/iphone-13-pro-max-128gb">
                      <img src={IconEdit} alt="" />
                    </Link>
                  </td>
                  <td data-label="Xoá" className="right__iconTable">
                    <img src={IconDelete} alt="" />
                  </td>
                </tr>
                <tr>
                  <td data-label="STT">3</td>
                  <td data-label="Tên sản phẩm">Samsung S21 FE</td>
                  <td data-label="Hình ảnh">
                    <img src={ImgProduct3} alt="" />
                  </td>
                  <td data-label="Giá SP">12.490.000 ₫</td>
                  <td data-label="Đã bán">1</td>
                  <td data-label="Từ khoá">mobi</td>
                  <td data-label="Thời gian">2020-07-13 21:30:41</td>
                  <td data-label="Sửa" className="right__iconTable">
                    <Link to="/template/editProduct/samsung-s21-fe">
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
          <Link to="/template/products" className="right__tableMore">
            <p>Xem tất cả sản phẩm</p>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
