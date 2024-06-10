import { useContext, useEffect, useState } from 'react';
import { ShopContext } from './Context/ShopContext';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Header and Footer Components
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'

// Import Pages
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Order from './Pages/Order';

// Import CSS
import './App.css';

// Phân tích URL để trích xuất tham số auth-token
function getAuthTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('auth-token');
}

// Phân tích URL để trích xuất tham số user-info
function getUserInfoFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('user-info');
}

// Kiểm tra xem auth-token đã được truyền qua URL hay không
const authToken = getAuthTokenFromURL();
const user = getUserInfoFromURL();
if (authToken && user) {
  // Lưu auth-token vào localStorage hoặc nơi lưu trữ khác
  localStorage.setItem('auth-token', authToken);
  localStorage.setItem('user', user);
  // Sau khi xử lý auth-token, bạn có thể xoá tham số từ URL nếu cần
  window.history.replaceState({}, document.title, window.location.pathname);
}

function App() {
  const [categories, setCategories] = useState([])
  const { normalizeString } = useContext(ShopContext);

  useEffect(() => {
    axios.get('http://localhost:4000/category/get')
      .then(res => {
        if (res.data.status === 200) {
          setCategories(res.data.results)
        }
      })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="clear"></div>
        <Routes>
          <Route path='/' element={<Home />} />
          {
            categories.length > 0 &&
            categories.map(category => {
              return (
                <Route key={category.id} path={`/${normalizeString(category.name)}`} element={<ShopCategory category={category} />}>
                  <Route path=':brandName' element={<ShopCategory category={category} />} />
                </Route>
              )
            })
          }
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/order/*' element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;