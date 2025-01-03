import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

export default function DetailsPage() {
  const { state: product } = useLocation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div>
        <p>No product selected. Please go back and select a product.</p>
        <button onClick={() => navigate('/home')}>Go back to Home</button>
      </div>
    );
  }

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState(product.reviews || []);

  const [newReview, setNewReview] = useState({
    rating: 1,
    comment: '',
  });

  const finalPrice = useMemo(() => {
    let priceAdjustment = product.price || 0;

    if (selectedColor === 'Red') priceAdjustment += 10;
    if (selectedSize === 'X-Large') priceAdjustment += 20;

    return priceAdjustment * quantity;
  }, [selectedColor, selectedSize, product.price, quantity]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize || quantity <= 0) {
      alert('Please select a color, size, and ensure quantity is valid!');
      return;
    }

    const cartItem = {
      product,
      selectedColor,
      selectedSize,
      quantity,
      finalPrice,
    };

    addToCart(cartItem);
    alert('Item added to cart!');
    navigate('/cart');
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (newReview.comment.trim() === '') {
      alert('Please write a comment');
      return;
    }

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview({ rating: 1, comment: '' });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/4 mb-4 md:mb-0 mr-4 md:block hidden">
          {product?.images && product.images.length>0 ? (
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="w-32 h-32 object-contain rounded"
            />
          ) : (
            <div className="bg-gray-300 w-32 h-32 flex items-center justify-center text-white">No Image</div>
          )}
        </div>

        <div className="md:w-1/2 mb-4 md:mb-0">
        {product?.images && product.images.length>0 ? (
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="w-full h-auto object-cover rounded"
            />
          ) : (
            <div className="bg-gray-300 w-full h-64 flex items-center justify-center text-white">No Image Available</div>
          )}
        </div>

        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Rating: {product?.rating?.rate} / 5 ({product?.rating?.count} reviews)
          </p>

          <div className="flex items-baseline mb-4">
            <p className="text-xl text-black font-bold">${finalPrice.toFixed(2)}</p>
            {product?.discountPercentage && (
              <p className="text-sm line-through text-gray-500 ml-2">
                ${product?.price.toFixed(2)}
              </p>
            )}
            {product?.discountPercentage && (
              <p className="text-sm text-red-500 ml-2">-{product?.discountPercentage}%</p>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product?.description || 'No description available.'}</p>
          <p className="text-3xl font-bold mb-2"> {product?.brand}</p>
          <p className="text-gray-500">{product.warrantyInformation}</p>
          <p className="text-gray-500">{product.shippingInformation}</p>
          <p className="text-gray-500">{product.availabilityStatus}</p>
          <p className="text-gray-500">{product.returnPolicy}</p>
          {/* <p className="text-gray-500">{product.minimumOrderQuantity}</p> */}

          <div className="mt-4">
            <h2 className="font-bold text-sm">Select Colors</h2>
            <div className="flex space-x-2 mt-2">
              {['Black', 'White', 'Gray', 'Red'].map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded ${selectedColor === color ? 'bg-black text-white' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-sm">Choose Size</h2>
            <div className="flex space-x-2 mt-2">
              {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex">
            <h2 className="font-bold text-sm">Quantity</h2>
            <div className="flex items-center space-x-2 mt-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity === 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className="mt-8 bg-black h-14 w-56 ml-16 mt[-15px] text-white py-2 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded">
                <div className="flex items-center">
                  <p className="text-yellow-500">{"★".repeat(review.rating)}</p>
                  <p className="ml-2 text-sm text-gray-500">Rating: {review.rating}</p>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to leave a review!</p>
          )}
        </div>

    
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm">Rating</label>
              <select
                value={newReview.rating}
                onChange={(event) => setNewReview({ ...newReview, rating: Number(event.target.value) })}
                className="border p-2 rounded"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && 's'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(event) => setNewReview({ ...newReview, comment: event.target.value })}
                className="border p-2 rounded w-full"
                rows="4"
                placeholder="Write your review here"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
