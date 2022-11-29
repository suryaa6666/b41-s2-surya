import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';

import Auth from './pages/Auth';
import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';
// import Complain from './pages/Complain';
import Profile from './pages/Profile';
// import ComplainAdmin from './pages/ComplainAdmin';
import CategoryAdmin from './pages/CategoryAdmin';
import ProductAdmin from './pages/ProductAdmin';
import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import UpdateProductAdmin from './pages/UpdateProductAdmin';

function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false && !isLoading) {
      navigate('/auth');
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      console.log("response check auth", response)

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      console.log("ini data state", state)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {
        isLoading ? null : <Routes>
          <Route exact path="/" element={<Product />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/profile" element={<Profile />} />
          {/*   <Route path="/complain" element={<Complain />} />
      <Route path="/complain-admin" element={<ComplainAdmin />} />*/}
          <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} />
          <Route path="/category-admin" element={<CategoryAdmin />} />
          <Route path="/product-admin" element={<ProductAdmin />} />
          <Route path="/add-category" element={<AddCategoryAdmin />} />
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/update-product/:id" element={<UpdateProductAdmin />} />
        </Routes>
      }
    </>
  );
}

export default App;
