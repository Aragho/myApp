import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './pages/CartContext'; 
import ROUTES from './route/router';  

const routes = createBrowserRouter([...ROUTES]);

function App() {
  return (
    <CartProvider>  
      <RouterProvider router={routes} />
    </CartProvider>
  );
}

export default App;
