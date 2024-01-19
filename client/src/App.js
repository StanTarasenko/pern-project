// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Shop from './pages/shopPage/Shop';
import Layout from './pages/Layout';
import Auth from './pages/authPage/Auth';
import DevicePage from './pages/devicePage/devicePage';
import Admin from './pages/adminPage/admin';
import { selectUser, setIsAuth, setUser } from './features/userSlice';
import { jwtDecode } from "jwt-decode";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector(selectUser);
  const decoded = token ? jwtDecode(token) : '';
  console.log(user);

  useEffect(() => {
    if (decoded) {
      dispatch(setUser(decoded));
      dispatch(setIsAuth(true));
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Shop />} />
            <Route path="/registration" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/device/:id" element={<DevicePage />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
 }

export default App;