import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from './Contexts/ConfigContext';
import { ProductProvider } from './Contexts/ProductContext';
import axios from 'axios';
import { UserProvider } from './Contexts/UserContext';

axios.defaults.baseURL = import.meta.env.VITE_API || "https://prettygirl-api-production.up.railway.app/"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
)