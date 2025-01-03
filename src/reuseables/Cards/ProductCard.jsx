import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const validRating = rating ?? 0;
    const fullStars = Math.floor(validRating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-gray-400" />
        ))}
      </>
    );
  };

  return (
    <div key={product.id} className="p-4 border rounded">
      <Link to="/productDetails" state={{ product }} className="block">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-lg font-semibold">{product.brand}</p>
        <div className="flex items-center">
          {renderStars(product.rating)}
        </div>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-gray-500">{product.stock} left in stock</p>
        <p className="text-gray-500">{product.warrantyInformation}</p>
        
        
      </Link>
    </div>
  );
};

export default ProductCard;
