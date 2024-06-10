import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

import uploadArea from '../../assets/upload_area.svg'


const EditProduct = () => {
  const { productID } = useParams()
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    id: productID,
    name: "",
    categoryId: "",
    image: "",
    label: "",
    oldPrice: "",
    newPrice: "",
    quantity: "",
    keyword: "",
    description: ""
  })
  const [image, setImage] = useState(null);

  const fetchProduct = async () => {
    await axios.get(`http://localhost:4000/product/getById/${productID}`)
      .then(res => {
        if (res.data.status === 200) {
          setProductDetails(res.data.results);
          setImage(res.data.results.image);
        }
      })
  }

  useEffect(() => {
    fetchProduct();

    axios.get('http://localhost:4000/category/get')
      .then(res => {
        if (res.data.status === 200) 
          setCategories(res.data.results);
      })
  }, [])

  const handleChange = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value});
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  }

  const updateProduct = async () => {
    let resData;
    let product = productDetails;
    
    // Upload image of product
    let formData = new FormData();
    formData.append('product', image);

    await axios.post('http://localhost:4000/upload', formData)
      .then(res => {
        resData = res.data;
      })
    
      // Update product to database
      if (resData.success) {
        if (image instanceof File) product.image = resData.image_urls[0];
        await axios.patch('http://localhost:4000/product/update', product)
         .then(res => {
          res.data.status === 200 ? alert("Product Updated") : alert("Failed");
         })
      }
  }

  return (
    <div className="right">
      <div className="right__content">
        <div className="right__title">Bảng điều khiển</div>
        <p className="right__desc">Cập nhật sản phẩm</p>
        <div className="right__formWrapper">
          <form action="" method="post" encType="multipart/form-data">
            <div className="right__inputWrapper">
              <label htmlFor="title">Tên sản phẩm</label>
              <input type="text" onChange={(e) => handleChange(e)} value={productDetails.name} name="name" placeholder="Tên sản phẩm" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="p_category">Danh mục</label>
              <select onChange={(e) => handleChange(e)} value={productDetails.categoryId} name="categoryId">
                <option disabled="">
                  Chọn danh mục
                </option>
                {categories.map((category, index) => {
                  return <option key={index} value={category.id}>{category.name}</option>
                })}
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="p_category">Tên thương hiệu</label>
              <select onChange={(e) => handleChange(e)} value={productDetails.categoryId} name="categoryId">
                <option disabled="">
                  Chọn thương hiệu
                </option>
                {categories.map((category, index) => {
                  return <option key={index} value={category.id}>{category.name}</option>
                })}
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="image">Hình ảnh</label>
                <label htmlFor="file-input">
                  {
                    image ? 
                    <img src={(image instanceof File) ? URL.createObjectURL(image) : image} className='new-color-thumbnail-img' alt="" /> :
                    <img src={uploadArea} className='new-color-thumbnail-img' alt="" />
                  }
                </label>
              <input onChange={(e) => handleImage(e)} type="file" name="image" id="file-input" hidden />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="label">Nhãn sản phẩm</label>
              <select onChange={(e) => handleChange(e)} value={productDetails.label} name="label">
                <option disabled="">
                  Nhãn sản phẩm
                </option>
                <option value="new">Mới</option>
                <option value="sale">Giảm giá</option>
              </select>
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Giá sản phẩm</label>
              <input type="text" onChange={(e) => handleChange(e)} name="oldPrice" value={productDetails.oldPrice} placeholder="Giá sản phẩm" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Giá giảm sản phẩm</label>
              <input type="text" onChange={(e) => handleChange(e)} name="newPrice" value={productDetails.newPrice} placeholder="Giá giảm sản phẩm" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Số lượng</label>
              <input type="text" onChange={(e) => handleChange(e)} name="quantity" value={productDetails.quantity} placeholder="Số lượng" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="title">Từ khoá</label>
              <input type="text" onChange={(e) => handleChange(e)} name="keyword" value={productDetails.keyword} placeholder="Từ khoá" />
            </div>
            <div className="right__inputWrapper">
              <label htmlFor="desc">Mô tả</label>
              <textarea
                name="description"
                id=""
                cols={30}
                rows={10}
                placeholder="Mô tả"
                value={productDetails.description}
                onChange={(e) => handleChange(e)} 
              />
            </div>
            <div style={{display: "flex"}}>
              <div onClick={() => updateProduct()} className="btn" style={{width: "40%"}}>Cập nhật sản phẩm</div>
              <div className="btn" style={{backgroundColor: "#d70018", width: "40%"}}>Ngừng bán</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
