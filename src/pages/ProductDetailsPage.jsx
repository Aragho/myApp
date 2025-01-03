import React from 'react';
import { useLocation, Link } from 'react-router-dom';


const ProductDetails = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Accessing the product data passed from SideBar

  if (!product) {
    return <div>No product details available.</div>;
  }

  return (
    <div className="p-4">
      <Link to = "/details" state={product}>
      
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <img src={product.images[0]} alt={product.title} className="w-full h-80 object-cover mb-4" />
      </Link>
      <p className="text-xl font-semibold mb-2">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      <h3 className="text-lg font-semibold mt-4">Reviews</h3>
      <ul className="space-y-2">
        {product.reviews.map((review, index) => (
          <li key={index} className="border p-2 rounded">
            <p className="font-semibold">{review.reviewerName}</p>
            <p>{review.comment}</p>
            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
            <p>{`Rating: ${review.rating}`}</p>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default ProductDetails;
