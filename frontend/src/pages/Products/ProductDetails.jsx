import React, { useState } from 'react'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import moment from 'moment'
import HeartIcon from './HeartIcon'
import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowAltCircleLeft, FaBox, FaCartArrowDown, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/features/cart/cartSlice'


const ProductDetails = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState()
    const [rating, setRating] = useState()
    const [comment, setComment] = useState()

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)

    const { userInfo } = useSelector(state => state.auth)

    const [createReview, { isLoading: lodingProductReview }] = useCreateReviewMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        try{
            await createReview({
                productId,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success("Review created successfully")
             
        } catch(err) {
            toast.error(err?.data || err.message)
        }
    }

    const addToCartHandler = () => {
        dispatch(addToCart({...product, quantity}))
        navigate('/cart')
    }


    return (
        <>
            <div>
                <Link to='/' className='text-white text-lg font-semibold hover:underline ml-[10rem] '>
                    {/* <FaArrowAltCircleLeft /> */}
                    Go Back 
                </Link>
            </div>

            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
                <>
                    <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
                        <div>
                            <img src={product.image} alt={product.name} className='w-full xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[25rem] mr-[2rem] '/>
                            <HeartIcon product={product} />
                        </div>

                        <div className="flex flex-col justify-between">
                            <h2 className='text-2xl font-semibold'>{product.name}</h2>
                            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">{product.description.substring(0, 350)}...</p>
                            <p className='text-xl my-4 font-bold'>Rs {product.price}</p>

                            <div className="flex items-center justify-between w-[20rem]" >
                                <div className="one">
                                    <h1 className="flex items-center mb-6">
                                        <FaStore className='mr-2 text-white' /> Brand: {product.brand}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaClock className='mr-2 text-white' /> Added: {moment(product.createdAt).fromNow()}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className='mr-2 text-white' /> Reviews: {product.numReviews}
                                    </h1>
                                </div>

                                <div className="two">
                                    <h1 className="flex items-center mb-6">
                                        <FaStar className='mr-2 text-white' /> Rating: {product.rating}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaShoppingCart className='mr-2 text-white' /> Quantity: {product.quantity}
                                    </h1>
                                    <h1 className="flex items-center mb-6">
                                        <FaBox className='mr-2 text-white' /> Stock: {product.constInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between flex-wrap">
                                {/* ratings */}
                                <Ratings value={product.rating} text={`\u00A0\u00A0${product.numReviews} reviews`} />

                                {product.constInStock > 0 && (
                                    <div>
                                        <select value={quantity} onChange={e=>setQuantity(e.target.value)} className='pl-3 bg-inherit w-[6rem] rounded-lg text-white'>
                                            {[...Array(product.constInStock).keys()].map((x)=> (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="btn-container">
                                <button 
                                onClick={addToCartHandler} 
                                disable={product.constInStock===0} className='bg-pink-600 text-white px-5 py-2 mt-4 rounded-lg md:mt-0 flex items-center '>
                                    <FaCartArrowDown className='mr-2' />
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className='mt-[5rem] container flex flex-wrap items-center justify-between ml-[10rem]'>
                                {/* productTabls */}
                                <ProductTabs 
                                    lodingProductReview={lodingProductReview} 
                                    userInfo={userInfo}
                                    submitHandler={submitHandler}
                                    rating={rating}
                                    setRating={setRating}
                                    comment={comment}
                                    setComment={setComment}
                                    product={product} 
                                />
                        </div>

                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails