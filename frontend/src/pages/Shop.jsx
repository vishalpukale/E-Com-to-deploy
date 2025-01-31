import React, { useEffect, useState } from 'react'
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice'
import { setCategories, setProducts, setRadio, setChecked } from '../redux/features/shop/shopSlice'
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './Products/ProductCard'


const Shop = () => {

  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };


  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className='bg-[#1b1b1b] p-3 mt-2 mb-2'>
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2"> Filter By Categories</h2>

            {/* categories */}
            <div className="p-5 w-[15rem]">
            {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center ml-8">
                    <input type="checkbox" id="red-checkbox" onChange={(e) => handleCheck(e.target.checked, c._id)} className="w-4 h-4 text-pink-600 bg-inherit border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>

                    <label htmlFor="pink-checkbox" className="ml-2 text-sm font-medium text-white dark:text-gray-300">{c.name}</label>
                  </div>
                </div>
              ))}
            </div>

            {/* brands */}
            <h2 className="h2 h4 text-center py-2 bg-black rounded-full mb-2">Filter By Brands</h2>

            <div className='p-5'>
              {uniqueBrands?.map((brand)=> (
                <>
                  <div className='flex items-center ml-8 p-1'>
                    <input className='w-4 h-4 text-pink-600 bg-inherit border-gray-300 rounded-full focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ' type="radio" id={brand} name='brand' onChange={() => handleBrandClick(brand)} />

                    <label htmlFor='pink-radio' className='ml-2 text-sm font-medium text-white dark:text-gray-300'>{brand}</label>
                  </div>
                </>
              ))}
            </div>

            {/* price */}
            <h2 className="h2 h4 text-center py-2 bg-black rounded-full mb-2">Filter by Price</h2>

            <div className='p-5 w-[15rem]'>
              <input type="text" value={priceFilter} onChange={handlePriceChange}  className='text-white bg-inherit w-full px-3 py-2 placeholder-grey-400 rounded-lg focus:outline-none focus:ring focus:border-blue-300'/>
            </div>

            {/* reset */}
            <div className="p-5 pt-0">
              <button className='w-full p-1 border my-4 bg-inherit border-gray-600 rounded-full focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' onClick={()=>window.location.reload()}>Reset</button>
            </div>

          </div>

          <div className="p-3">
            <h2 className='h4 text-center mb-2'>{products?.length}</h2>
            <div className="flex flex-wrap">
              {
                products.length == 0 ? (
                  <Loader />
                ) : (
                  products?.map((p)=> (
                    <div className='p-3' key={p._id}>
                      <ProductCard p={p}/>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop