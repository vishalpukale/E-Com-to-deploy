import React from 'react'
import { toast } from 'react-toastify';
import HeartIcon from './HeartIcon'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCard = ({ p }) => {

    const dispatch = useDispatch()

    const addToCartHandler = (product, quantity) => {
        dispatch(addToCart({...product, quantity}))
        toast.success("Item Added to cart")
    }

    return ( 
        <div className='max-w-sm  w-[280px] relative bg-[#1A1A1A] rounded-lg dark:bg-gray-800 dark:border-gray-700'>
            <section className="realative">
                <Link to={`/product/${p._id}`}>
                    <span className="absolute top-2 left-2 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                        {p?.brand}
                    </span>

                    <img className='cursor-pointer w-full' src={p.image} alt={p.name} style={{ width: "280px", height: '180px', objectFit: 'fill' }} />
                </Link>
                <HeartIcon product={p} />
            </section>

            <div className="p-2">
                <div className="flex justify-between align-middle">
                    <h5 className='mb-2 text-xl text-white dark:text-white'>
                        {p?.name.substring(0, 14)}...
                    </h5>
                    <p className=" font-semibold text-pink-500 mt-1">
                        {p?.price?.toLocaleString('en-RS', {
                            style: 'currency',
                            currency: 'INR',

                        })}
                    </p>
                </div>

                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description.substring(0, 70)}...
                </p>

                <section className='flex justify-between items-center'>
                    <Link to={`/product/${p._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"> 
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>

                    <button className='p-2 rounded-full' onClick={()=> addToCartHandler(p, 1)}>
                        <AiOutlineShoppingCart size={25} />
                    </button>
                </section>
            </div>
        </div>
    )
}

export default ProductCard