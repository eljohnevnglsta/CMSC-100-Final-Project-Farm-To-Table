import React from 'react';
import './index.css';
import App from './App';
import Layout from './pages/Layout';
import { AuthProvider } from './context/authprovider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {createRoot} from 'react-dom/client';

const rootElement = 
document.getElementById('root');
const root = 
createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);










