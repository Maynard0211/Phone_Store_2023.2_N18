import React from 'react'

import './PaymentModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { payment } from '../Assets/payment.js'
import tickIcon from '../Assets/download.svg'

function PaymentModal({ modal, handlePopup, handlePayment }) {
  return (
    <>
        <div className="payment-overlay"></div>
        <div className="payment-modal">
            <div className="payment-modal__head">
                <p>Chọn phương thức thanh toán</p>
                <em onClick={() => handlePopup()}>
                    <FontAwesomeIcon icon={faXmark} />
                </em>
            </div>
            <div className="payment-modal__body">
                <div className="payment-modal__body-main">
                    <div className="list-payment">
                        <p>Khả dụng</p>
                        {
                            payment.map((mode, index) => {
                                return (
                                    <div key={index} onClick={() => handlePayment(mode.name)} 
                                        className={`list-payment__item ${modal === mode.name ? "list-payment__item--active" : ''}`}
                                    >
                                        <div className="payment-item__img">
                                            <img src={mode.image} alt="" />
                                        </div>
                                        <div className="payment-item__title">
                                            <p>{mode.name}</p>
                                        </div>
                                        <div className="payment-item__tick">
                                            <img src={tickIcon} alt="" />
                                        </div> 
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="payment-modal__bottom">
                <button disabled={`${modal === "" ? "disabled" : ""}`} className="btn btn-danger">
                    Xác nhận
                </button>
            </div>
        </div>
    </>
  )
}

export default PaymentModal