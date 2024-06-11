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
                        <div onClick={() => handlePayment(payment.THANH_TOAN_KHI_NHAN_HANG.name)} 
                            className={`list-payment__item ${modal === payment.THANH_TOAN_KHI_NHAN_HANG.name ? "list-payment__item--active" : ''}`}
                        >
                            <div className="payment-item__img">
                                <img src={payment.THANH_TOAN_KHI_NHAN_HANG.image} alt="" />
                            </div>
                            <div className="payment-item__title">
                                <p>{payment.THANH_TOAN_KHI_NHAN_HANG.name}</p>
                            </div>
                            <div className="payment-item__tick"></div>
                        </div>
                        <div onClick={() => handlePayment(payment.VNPAY.name)} 
                            className={`list-payment__item ${modal === payment.VNPAY.name ? "list-payment__item--active" : ''}`}
                        >
                            <div className="payment-item__img">
                                <img src={payment.VNPAY.image} alt="" />
                            </div>
                            <div className="payment-item__title">
                                <p>{payment.VNPAY.name}</p>
                            </div>
                            <div className="payment-item__tick">
                                <img src={tickIcon} alt="" />
                            </div>
                        </div>
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