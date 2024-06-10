import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

import { ShopContext } from '../Context/ShopContext';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import Item from '../Components/Item/Item';
import MenuBottomTabs from '../Components/MenuBottomTabs/MenuBottomTabs';

import './CSS/ShopCategory.css'

import dropdown_icon from '../Components/Assets/dropdown_icon.png'

function ShopCategory({ category }) {
  const { normalizeString} = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState();
  const {brandName} = useParams();
  const [brandList, setBrandList] = useState([]);
  const [maxIndex, setMaxIndex] = useState(20);

  useEffect(() => {
    setBrand(brandList.find(item => item.name.toLowerCase() === brandName))
  }, [brandName])

  useEffect(() => {
    axios.get(`http://localhost:4000/brand/${category.id}`)
      .then((res) => {
        setBrandList(res.data)
      })
  }, [category])

  useEffect(() => {
    if (brand?.id) {
      axios.get(`http://localhost:4000/product/getByBrand/${brand.id}`)
        .then(res => {
          if (res.data.status === 200)
            setProducts(res.data.results)
        })
    } else {
      axios.get(`http://localhost:4000/product/getByCategory/${category.id}`)
        .then(res => {
          if (res.data.status === 200)
            setProducts(res.data.results)
        })
    }
  }, [brand, category])

  return (
    <div className='category-container'>
      <Breadcrumbs category={category.name} brand={brand?.name} />
      <div className="block-filter-brand">
        <div className="filter-brands-title">Chọn theo thương hiệu</div>
        <div className="list-brand">
          {
            brandList ?
            brandList.map((brand, index) => {
              return (
                <Link
                  key={index}
                  to={`/${normalizeString(category.name)}/${brand.name.toLowerCase()}`}
                  className='list-brand-item'
                >
                  <img src={brand.image} alt={brand.name} className="brand-img" />
                </Link>
              )
            }) : <></>
          }
        </div>
      </div>
      <div className="block-filter-indexSort">
        <div className="filter-indexSort-title">
          <p>
            <span>Hiển thị 1-{(maxIndex < products.length) ? maxIndex : products.length}</span> trên tổng số {products.length} sản phẩm
          </p>
          <div className="filter-sort-btn">
            Sắp xếp theo <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="block-products-filter">
          {products.slice(0, Math.min(maxIndex, products.length)).map((product, index) => {
            return (
              <Item 
                key={index}
                id={product.id}
                name={product.name}
                image={product.image}
                newPrice={product.newPrice}
                oldPrice={product.oldPrice}
              />
            )
          })}
        </div>
        {(maxIndex < products.length) && 
        <div onClick={() => setMaxIndex(prev => prev + 20)} className="category-loadmore">
          Xem thêm {products.length - maxIndex} sản phẩm
        </div>
        }
      </div>
      <MenuBottomTabs active={'Home'} />
    </div>
  )
}

export default ShopCategory;