import React from 'react';

const AllCategory = ({ onSelectCategory }) => {
  const categories = [
    'beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration',
    'kitchen-accessories', 'laptops', 'mens-shirts', 'mens-shoes', 'mens-watches',
    'mobile-accessories', 'motorcycle', 'skin-care', 'smartphones', 'sports-accessories',
    'sunglasses', 'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses', 'womens-jewellery',
    'womens-shoes', 'womens-watches'
  ];

  return (
    <div className="space-y-2 " >
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => onSelectCategory(category)}
            className="cursor-pointer p-2 rounded hover:bg-gray-200"
          >
            {category.replace(/-/g, ' ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCategory;
