import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaShippingFast, FaUserAlt, FaEnvelope } from 'react-icons/fa';

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    deliveryFee,
    discountAmount,
    finalTotal,
  } = useCart();

 
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const orderDetails = {
      shippingInfo,
      cart,
      subtotal,
      deliveryFee,
      discountAmount,
      finalTotal,
    };

    
    navigate('/confirm', { state: { orderDetails } });
  };

  return (
    <div className="checkout-page p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="shipping-info mb-8 p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaShippingFast size={24} /> Shipping Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-lg mb-2" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-lg mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-lg mb-2" htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-lg mb-2" htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingInfo.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>

      <div className="order-summary p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserAlt size={24} /> Order Summary
        </h2>
        <ul className="mb-6">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between mb-4 border-b pb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.product.title}</h3>
                <p>Size: {item.selectedSize}</p>
                <p>Color: {item.selectedColor}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="text-black font-bold">
                  ${item.finalPrice.toFixed(2)} x {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-summary mb-6">
          <p>Subtotal: <span className="font-bold">${subtotal.toFixed(2)}</span></p>
          <p>Delivery Fee: <span className="font-bold">${deliveryFee.toFixed(2)}</span></p>
          <p>Discount: <span className="font-bold">-${discountAmount.toFixed(2)}</span></p>
          <p className="text-xl font-bold">Total: <span className="font-bold">${finalTotal.toFixed(2)}</span></p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/cart">
          <button className="bg-black hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md">
            Back to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
