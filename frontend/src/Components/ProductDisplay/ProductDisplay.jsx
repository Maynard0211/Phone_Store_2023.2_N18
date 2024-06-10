import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext';

import './ProductDisplay.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ProductDisplay(props) {
    const {product} = props;
    const { formatPrice, addToCart } = useContext(ShopContext);
    const [index, setIndex] = useState(0);

  return (
    <div className='productdisplay'>
        <div className="box-product-detail">
            <div className="box-product-detail__left">
                <div className="box-gallery">
                    <div className="gallery-slide swiper-container">
                        <div 
                            className="swiper-wrapper"
                            style={{
                                transform: `translateX(${-index * 100}%)`,
                                transitionDuration: '300ms'
                            }}
                        >
                            <div key={index} className="swiper-slide gallery-img">
                                <img src={product.image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-product-detail__right">
                <div className="box-header">
                    <div className="box-product-name">
                        <h1>{product.name}</h1>
                    </div>
                    <div className="box-rating">
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="star-icon">
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        &nbsp;100 đánh giá
                    </div>
                </div>
                <hr />
                <div className="box-price">
                    <div className="item-price-detail">
                        <p className="item-new-price">{formatPrice(product.newPrice)}</p>
                    </div>
                    <div className="item-price-detail">
                        <p className="item-old-price">{formatPrice(product.oldPrice)}</p>
                    </div>
                </div>
                <div className="box-order-btn">
                    <button 
                        onClick={() => addToCart(
                            product.id, 
                            product.name,
                            product.image,
                            product.newPrice,
                            product.oldPrice
                        )} 
                        className="order-btn"
                    >
                        <Link to='/cart'>
                            <strong>MUA NGAY</strong>
                            <span>(Thanh toán khi nhận hàng hoặc nhận tại cửa hàng)</span>
                        </Link>
                    </button>
                    <button 
                        onClick={() => addToCart(
                            product.id,
                            product.name,
                            product.image, 
                            product.newPrice,
                            product.oldPrice
                        )} 
                        className="add-to-cart-btn"
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>Thêm vào giỏ</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay