import React from 'react'
import { Link } from 'react-router-dom'

// Import CSS file
import './MenuTree.css'

// Import icons from Assets and FontAwesomeIcon
import mobileIcon from '../Assets/mobile_icon.svg'
import tabletIcon from '../Assets/tablet_icon.png'
import laptopIcon from '../Assets/laptop_icon.svg'
import pcIcon from '../Assets/pc_icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function MenuTree({ onMenuItemClick }) {
  return (
    <>
      <div className='menu-tree'>
          <div className="label-menu-tree">
            <Link onClick={onMenuItemClick} to='/dienthoai'>
              <div className="label-item">
                <div className="item-content">
                  <i className="category-icon">
                    <img src={mobileIcon} alt="" />
                  </i>
                  <span className='item-link'>Điện thoại</span>
                </div>
                <div className='right-icon'>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </Link>
          </div>
          <div className="label-menu-tree">
            <Link onClick={onMenuItemClick} to='/laptop'>
              <div className="label-item">
                <div className="item-content">
                  <i className="category-icon">
                    <img src={laptopIcon} alt="" />
                  </i>
                  <span className='item-link'>Laptop</span>
                </div>
                <div className='right-icon'>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </Link>
          </div>
      </div>
      <div onClick={onMenuItemClick} className="header-overlay"></div>
    </>
  )
}

export default MenuTree