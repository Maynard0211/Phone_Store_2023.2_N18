import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

import './CSS/Product.css'
import MenuBottomTabs from '../Components/MenuBottomTabs/MenuBottomTabs';
import axios from 'axios';

function Product() {
  const {productId} = useParams();
  const [product, setProduct] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/product/getByID/${productId}`)
      .then(res => {
        if (res.data.status === 200) 
          setProduct({...res.data.results})
      })
  }, [productId])

  useEffect(() => {
    if (product) {
      axios.get('http://localhost:4000/category/get')
        .then(res => {
          if (res.data.status === 200) 
            setCategory(res.data.results.find(item => item.id === product.categoryId))
        })
    }
  }, [product])

  return (
    <div className='product-container'>
      {
        (product) ? 
        <>
          <Breadcrumbs product={product} category={category?.name} />
          <ProductDisplay product={product} />
          <DescriptionBox product={product} />
          <RelatedProducts product={product} categoryId={product.categoryId} />
        </> : 
        <></>
      }
      <MenuBottomTabs active={'Home'} />
    </div>
  )
}

export default Product