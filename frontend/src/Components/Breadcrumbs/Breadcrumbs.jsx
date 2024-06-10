import React from 'react'
import { Link } from 'react-router-dom';

import './Breadcrumbs.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHouse } from '@fortawesome/free-solid-svg-icons';

function Breadcrumbs({product, category, brand}) {

  return (
    <>
      <div className='breadcrumbs'>
        <div className="breadcrumbs-container">
          <div className="breadcrumbs-blocks">
            <div className="breadcrumbs-block">
              <FontAwesomeIcon icon={faHouse} className='home-icon' />
              <Link to={'/'}>Trang chủ</Link>
            </div>
            <div className="breadcrumbs-block">
              <FontAwesomeIcon icon={faChevronRight} />
              <Link to={`/${category}`}>{category}</Link>
            </div>
            {(brand) ? 
              <div className="breadcrumbs-block">
                <FontAwesomeIcon icon={faChevronRight} />
                <Link 
                  to={`/${category}/${brand.toLowerCase()}`}
                >
                  {brand}
                </Link>
              </div> :
              <></>
            }
            {(product) ? 
              <div className="breadcrumbs-block">
                <FontAwesomeIcon icon={faChevronRight} />
                <Link to={`/product/${product.id}`}>
                  {product.name}
                </Link>
              </div> :
              <></>
            }
          </div>
        </div>
      </div>
      <div className="block-breadcrumbs-clear"></div>
    </>
  )
}

export default Breadcrumbs;