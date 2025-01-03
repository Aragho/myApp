import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [deliveryFee, setDeliveryFee] = useState(5);
  const [discountPercentage, setDiscountPercentage] = useState(20);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  };

  const calculateTotalBeforeDiscount = () => {
    return calculateSubtotal() + deliveryFee;
  };

  const calculateDiscountAmount = () => {
    return (calculateTotalBeforeDiscount() * discountPercentage) / 100;
  };

  const calculateFinalTotal = () => {
    return calculateTotalBeforeDiscount() - calculateDiscountAmount();
  };
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal: calculateSubtotal(),
        deliveryFee,
        discountPercentage,
        totalBeforeDiscount: calculateTotalBeforeDiscount(),
        discountAmount: calculateDiscountAmount(),
        finalTotal: calculateFinalTotal(),
        setDeliveryFee,
        setDiscountPercentage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
