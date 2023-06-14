import React from 'react'
import { useNavigate } from "react-router-dom"
import './Products.scss'

const Products = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-products">
      <h3>Productos</h3>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Accesorios"
          }
        })
      }}>Accesorios</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Bikini"
          }
        })
      }}>Bikinis</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Bolsos"
          }
        })
      }}>Bolsos</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Camisas"
          }
        })
      }}>Camisas</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Lentes"
          }
        })
      }}>Lentes</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Pantalones"
          }
        })
      }}>Pantalones</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Shorts"
          }
        })
      }}>Shorts</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Vestidos"
          }
        })
      }}>Vestidos</p>
      <p onClick={(e) => {
        // Reload page if we are in the same page
        if (window.location.pathname === '/feed/filtered')
          window.location.reload();
        // Navigate to the filtered page
        navigate('/feed/filtered', {
          state: {
            filteredUrl: "/api/products?category=Zapatos"
          }
        })
      }}>Zapatos</p>
    </div>
  )
}

export default Products