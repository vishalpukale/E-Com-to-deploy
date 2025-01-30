import React from 'react'
import { Link, useParams } from 'react-router'
import { useGetProductsQuery } from '../redux/api/productApiSlice'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Message from '../components/Message'
import Product from './Products/Product'

const Home = () => {

  const { keyword } = useParams()
  const { data, isLoading, isError } = useGetProductsQuery({ keyword })


  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>
        {isError?.data.message || isError.error}
      </Message>) : (
        <>
          <div className='flex justify-between items-center mt-[10rem]'>
            <h1 className='ml-[20rem] text-[3rem]'>
              Special Products
            </h1>

            <Link to='/shop' className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem]'>
              Shop
            </Link>
          </div>

          {/* special product after */}
          <div className="flex justify-center flex-wrap">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home