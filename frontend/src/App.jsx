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

// Kiểm tra xem auth-token đã được truyền qua URL hay không
const authToken = getAuthTokenFromURL();
if (authToken) {
  // Lưu auth-token vào localStorage hoặc nơi lưu trữ khác
  localStorage.setItem('auth-token', authToken);
  // Sau khi xử lý auth-token, bạn có thể xoá tham số từ URL nếu cần
  window.history.replaceState({}, document.title, window.location.pathname);
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="clear"></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mobile' element={<ShopCategory category="Mobile" />}>
            <Route path=':brandName' element={<ShopCategory category="Mobile" />} />
          </Route>
          <Route path='/tablet' element={<ShopCategory category="Tablet" />} />
          <Route path='/laptop' element={<ShopCategory category="Laptop" />} />
          <Route path='/personalcomputer' element={<ShopCategory category="PersonalComputer" /> } />
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