import React, { useState } from 'react';
import { useGetProductsByCategoryQuery, useGetAllProductsQuery,useGetProductsSearchQuery } from '../../services/dummyjsonApi';
import ProductCard from '../../reuseables/Cards/ProductCard';
import AllCategory from "../AllCategory";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoryProducts, isLoading: isCategoryLoading, error: categoryError } =
    useGetProductsByCategoryQuery(selectedCategory, {
      skip: !selectedCategory, 
    });

  const { data: allProducts, isLoading: isAllLoading, error: allError } = useGetAllProductsQuery();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  if (isAllLoading || isCategoryLoading) return <div>Loading products...</div>;
  if (allError || categoryError) return <div className="text-red-500">Error fetching products. Please try again!</div>;

  const productsToDisplay = selectedCategory
    ? categoryProducts?.products
    : allProducts?.products;

  const topSelling = !selectedCategory
    ? allProducts?.products?.filter((product) => product.rating >= 4 && product.rating <= 5)
    : null;

  const limitedStocks = !selectedCategory
    ? allProducts?.products?.filter((product) => product.stock <= 5)
    : null;

  const recentlyAdded = !selectedCategory
    ? allProducts?.products
        ?.slice()
        ?.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    : null;
  

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <AllCategory onSelectCategory={handleCategorySelect} />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          {selectedCategory
            ? `${selectedCategory.replace(/-/g, ' ')} Products`
            : "Welcome to Our Store"}
        </h1>

        {!selectedCategory ? (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topSelling?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Limited Stocks</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {limitedStocks?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Recently Added Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentlyAdded?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productsToDisplay?.length > 0 ? (
              productsToDisplay.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div>No products found for the selected category.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
