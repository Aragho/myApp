import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { orderDetails } = location.state || {}; 

  if (!orderDetails) {
    return <div>Order details not found.</div>;
  }

  const { shippingInfo, cart, subtotal, deliveryFee, discountAmount, finalTotal } = orderDetails;

  return (
    <div className="order-confirmation-page p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Thank You for Your Order!</h1>

      <div className="flex justify-center mb-6">
        <FaCheckCircle size={50} color="#28a745" />
      </div>

      <div className="order-summary p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          Order Summary
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <p>{shippingInfo.name}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
          <p>{shippingInfo.country}</p>
          <p>{shippingInfo.email}</p>
        </div>

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

    
      <div className="text-center mb-4">
        <Link to="/home">
          <button className="bg-black hover:bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md">
            Continue Shopping
          </button>
        </Link>
      </div>

      <div className="text-center">
        <Link to="/order-tracking">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md">
            Track Your Order
          </button>
        </Link>
      </div>
    </div>
  );
}
