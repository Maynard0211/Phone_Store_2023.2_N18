import axios from 'axios';
import { toast } from 'react-toastify';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function requestRegister() {
  return {
    type: REGISTER_REQUEST,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return (dispatch) => {
    dispatch(requestRegister());

    axios.post('http://localhost:4000/user/signup', payload.creds)
      .then(res => {
        // Kiểm tra xem phản hồi có mã lỗi không
        if (res.status === 200) {
          // Phản hồi thành công, gửi action REGISTER_SUCCESS
          dispatch(receiveRegister());
          // Thông báo đăng ký thành công và chuyển đến trang login
          toast.success("You've been registered successfully");
          payload.history.push('/login');
        } else {
          // Phản hồi không thành công, gửi action REGISTER_FAILURE với thông báo lỗi từ phản hồi
          dispatch(registerError(res.data.message));
        }
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        dispatch(registerError('Something went wrong. Please try again.'));
      });
  }
}
