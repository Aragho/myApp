import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Fill } from "react-icons/ri";


export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/home"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded shadow hover:bg-blue-500 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const totalAmount = cart.reduce((total, item) => total + item.finalPrice, 0).toFixed(2);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Items</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center mb-6 border-b pb-6">
             <img
                src={item.product?.images && item.product.images.length > 0 ? item.product.images[0] : 'https://via.placeholder.com/150'} 
                alt={item.product?.title || 'Product Image'}
                className="w-24 h-24 object-cover rounded shadow-sm"
                />
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-700">{item.product?.title}</h3>
                <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  ${item.finalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-600 text-lg"
              >
                <RiDeleteBin6Fill size={24} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6 lg:w-1/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-800">${totalAmount}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-gray-800">Free</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold text-gray-800">$0.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-800">Total:</span>
              <span className="text-blue-600">${totalAmount}</span>
            </div>
          </div>

        
          <div className="mt-6">
            <Link to ="/checkout">
              <button className="w-full bg-black text-white py-3 rounded shadow hover:bg-gray-600 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
