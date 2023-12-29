// Modules
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Shop from './pages/shopPage/Shop';
import Layout from './pages/Layout';
import Auth from './pages/authPage/Auth';
import DevicePage from './pages/devicePage/devicePage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Shop />} />
            <Route path="/registration" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
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