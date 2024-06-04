
import './Breadcrumbs.css'

function Breadcrumbs({product, category, brand}) {
  const lowercaseCategory = category.toLowerCase();

  return (
    <div className='breadcrumbs'>
      <div className="breadcrumbs-container">
        <div className="breadcrumbs-blocks">
          <div className="breadcrumbs-block">
            <FontAwesomeIcon icon={faHouse} className='home-icon' />
            <Link to={'/'}>Trang chủ</Link>
          </div>
          <div className="breadcrumbs-block">
            <FontAwesomeIcon icon={faChevronRight} />
            <Link to={`/${lowercaseCategory}`}>{category}</Link>
          </div>
          {(brand) ? 
            <div className="breadcrumbs-block">
              <FontAwesomeIcon icon={faChevronRight} />
              <Link 
                to={`/${lowercaseCategory}/${brand.toLowerCase()}`}
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
  )
}

export default Breadcrumbs;