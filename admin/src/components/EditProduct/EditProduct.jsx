import React from "react";

const EditProduct = () => {
  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Cập nhật sản phẩm</p>
        <div className="right__formWrapper">
          <form action="" method="post" encType="multipart/form-data">
            <div className="right__inputWrapper">
              <label htmlFor="title">Tiêu đề</label>
              <input type="text" placeholder="Tiêu đề" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="p_category">Danh mục</label>
              <select name="">
                <option disabled="" selected="">
                  Chọn danh mục
                </option>
                <option value="">iPhone</option>
                <option value="">Samsung</option>
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="category">Thể loại</label>
              <select name="">
                <option disabled="" selected="">
                  Chọn thể loại
                </option>
                <option value="">Điện thoại</option>
                <option value="">Laptop</option>
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="image">Hình ảnh 1</label>
              <input type="file" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="image">Hình ảnh 2</label>
              <input type="file" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="image">Hình ảnh 3</label>
              <input type="file" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="label">Nhãn sản phẩm</label>
              <select name="">
                <option disabled="" selected="">
                  Nhãn sản phẩm
                </option>
                <option value="new">Mới</option>
                <option value="sale">Giảm giá</option>
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Giá sản phẩm</label>
              <input type="text" placeholder="Giá sản phẩm" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Giá giảm sản phẩm</label>
              <input type="text" placeholder="Giá giảm sản phẩm" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Từ khoá</label>
              <input type="text" placeholder="Từ khoá" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="desc">Mô tả</label>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="Mô tả"
                defaultValue={""}
              />
            </div>
            <div className="btn">
              Cập nhật sản phẩm
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
