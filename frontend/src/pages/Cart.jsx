import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({...product, quantity}))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    console.log(cartItems.totalPrice)
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  }



  return (
    <>
      <div className="container flex justify-around items-center flex-wrap mx-auto mt-8">
        {cartItems.length == 0 ? (<div>Your Cart is empty <Link to='/shop'>Go to shop</Link></div>) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-xl mb-4 font-semibold">Shopping Cart</h1>

              {cartItems.map((item) => (
                <div key={item._id} className='flex items-center mb-[1rem] pb-2'>
                  <div className='w-[5rem] h-[5rem]'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded' />
                  </div>

                  <div className='flex-1 ml-4'>
                    <Link to={`/product/${item._id}`} className='text-pink-500 text-lg'>
                      {item.name}
                    </Link>
                    
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className='mt-2 text-white font-bold'>Rs {item.price}</div>
                  </div>

                  <div className='w-24'>
                    <select className='w-full p-1 border rounded bg-inherit' value={item.quantity} 
                    onChange={e=> addToCartHandler(item, Number(e.target.value))}>
                      {[...Array(item.constInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button className='text-red-500 mr-[5rem]' 
                    onClick={()=>removeFromCartHandler(item._id)}>
                      <FaTrash className='ml-[1rem]'/>
                    </button>
                  </div>

                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className='p-4 rounded-lg'>
                  <h2 className='text-xl font-semibold mb-2'>
                    Items ({cartItems.reduce((acc, item) => acc + Number(item.quantity || 1), 0)})
                  </h2>
                  <div className="text-2xl font-bold">
                  Rs {cartItems.reduce((acc, item) => acc + Number(item.quantity || 1) * Number(item.price || 0), 0).toFixed(2)}
                  </div>

                  <button 
                    className='bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full' 
                    disabled={cartItems.length == 0}
                    onClick={checkoutHandler}>
                      Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart