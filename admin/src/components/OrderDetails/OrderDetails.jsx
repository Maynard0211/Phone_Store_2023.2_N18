import React, { useState } from "react";

const OrderDetails = () => {
  const [products, setProducts] = useState([])

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Chi tiết hóa đơn</p>
        <div className="right__formWrapper">
          <h1 >THÔNG TIN KHÁCH HÀNG</h1>
          <div className="right__grid right__grid--row">
            <div className="right__label">Tên khách hàng</div>
            <div className="right__value">Phạm Văn A</div>
            <div className="right__label">Số điện thoại</div>
            <div className="right__value">0123456789</div>
            <div className="right__label">Địa chỉ</div>
            <div className="right__value">Thành phố A</div>
            <div className="right__label">Thời gian đặt hàng</div>
            <div className="right__value">2020-07-13 21:31:05</div>
            <div className="right__label">Hạn bảo hành</div>
            <div className="right__value">12 tháng</div>
            <div className="right__label">Mô tả</div>
            <div className="right__value">Không có</div>
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
                  <th>Đã bán</th>
                  <th>Từ khoá</th>
                  <th>Thời gian</th>
                  <th>Sửa</th>
                  <th>Xoá</th>
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
        </div>
        
      </div>
    </div>
  );
};

export default OrderDetails;