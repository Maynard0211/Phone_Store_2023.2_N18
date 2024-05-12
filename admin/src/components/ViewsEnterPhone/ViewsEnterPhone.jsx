import React from "react";
import ImgProduct1 from "../../images/product1.jpg";
import ImgProduct2 from "../../images/product2.jpg";
import ImgProduct3 from "../../images/product3.jpg";
import IconEdit from "../../assets/icon-edit.svg";
import IconDelete from "../../assets/icon-trash-black.svg";
import { Link } from "react-router-dom";

const ViewsEnterPhone = () => {
  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Xem hoá đơn nhập điện thoại</p>
        <div className="right__table">
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
                    <Link to="/template/editEnterPhone/iphone14-pro-max-128gb">
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
                    <Link to="/template/editEnterPhone/iphone-13-pro-max-128gb">
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
                    <Link to="/template/editEnterPhone/samsung-s21-fe">
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

export default ViewsEnterPhone;
