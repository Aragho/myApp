import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiShoppingCart, CiLogout } from "react-icons/ci";
import { IoMdContact, IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useGetProductsSearchQuery } from '../services/dummyjsonApi'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemCount = useSelector((state) => state.cart?.totalItems || 0);

  const { data: searchResults, isLoading, error } = useGetProductsSearchQuery(searchQuery, {
    skip: !searchQuery,
  });

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      setSearchQuery(searchQuery);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-black">
          <Link to="/">RIA.SHOP</Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/home" className="text-black hover:text-blue-500" aria-label="Home">
            <IoMdHome size={28} />
          </Link>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="border px-3 py-1 rounded w-64 focus:outline-none"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <FaSearch size={18} />
            </button>
          </div>
          <div className="relative">
            <Link to="/cart" className="text-black hover:text-blue-500" aria-label="Shopping Cart">
              <CiShoppingCart size={28} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <Link to="/contact" className="text-black hover:text-blue-500" aria-label="Contact Us">
            <IoMdContact size={28} />
          </Link>
          <Link to="/logout" className="text-black hover:text-blue-500" aria-label="Logout">
            <CiLogout size={28} />
          </Link>
        </div>
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <IoMdClose size={30} /> : <GiHamburgerMenu size={30} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="border px-3 py-1 rounded w-full"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-black"
            >
              <FaSearch size={18} />
            </button>
          </div>
          <Link to="/" className="block text-black hover:text-gray-500">Home</Link>
          <Link to="/shop" className="block text-black hover:text-gray-500">Shop</Link>
          <Link to="/cart" className="block text-black hover:text-gray-500">Cart</Link>
          <Link to="/contact" className="block text-black hover:text-gray-500">Contact</Link>
          <Link to="/logout" className="block text-black hover:text-gray-500">
            Logout
          </Link>
        </div>
      )}
      {searchQuery && (
        <div className="mt-4">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching products</p>}
          {searchResults?.products?.length === 0 && <p>No products found!</p>}
          {searchResults?.products && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.products.map((product) => (
                <div key={product.id} className="border p-4">
                  <img
                    src={product?.images ? product.images[0] : product?.image}
                    alt={product?.title}
                    className="w-full h-48 object-cover"
                  />
                  <p className="mt-2 font-bold">{product.title}</p>
                  <p>{product.price}</p>
                  <p className="text-gray-500">{product.category}</p>
                  <p className="text-gray-500">{product.stock} left in stock</p>
                  <p className="text-gray-500">{product.warrantyInformation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
