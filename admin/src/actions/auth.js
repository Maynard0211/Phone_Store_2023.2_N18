import axios from 'axios'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('auth-token');
    localStorage.removeItem('authenticated');
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    axios.post('http://localhost:4000/user/login', creds)
      .then(res => {
        // Kiểm tra xem phản hồi có mã lỗi không
        if (res.status === 200) {
          // Lưu token và trạng thái xác thực vào localStorage
          localStorage.setItem('auth-token', res.data.token);
          localStorage.setItem('authenticated', true);
          // Phản hồi thành công, gửi action LOGIN_SUCCESS
          dispatch(receiveLogin());
        } else {
          // Phản hồi không thành công, gửi action LOGIN_FAILURE với thông báo lỗi từ phản hồi
          dispatch(loginError(res.data.message));
        }
      })
      .catch(error => {
        // Xử lý lỗi nếu có
        dispatch(loginError('Something went wrong. Please try again.'));
      });
  }
}

