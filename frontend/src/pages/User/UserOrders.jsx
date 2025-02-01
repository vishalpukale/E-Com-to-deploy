import React from 'react'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Link } from 'react-router'
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice'

const UserOrders = () => {

    const {data: orders, isLoading, error} = useGetMyOrdersQuery()

    return (
        <div className='container mx-auto'>
            <h2 className="text-xl font-semibold mb-4">My Orders</h2>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.error || error.error}</Message>
            ) : (
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='py-2'>Image</td>
                            <td className='py-2'>Id</td>
                            <td className='py-2'>Date</td>
                            <td className='py-2'>Total</td>
                            <td className='py-2'>Paid</td>
                            <td className='py-2'>Delivered</td>  
                            <td className='py-2'>Status</td>  
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <img src={order.orderItems[0].image} alt={order.user} className='w-[6rem] mb-5' />
                                <td className='py-2'>{order._id}</td>
                                <td className='py-2'>{order.createdAt.substring(0, 10)}</td>
                                <td className='py-2'>Rs {order.totalPrice}</td>
                                <td className='py-2'>
                                    {order.isPaid ? (
                                        <p className='p-2 text-center bg-green-400 w-[6rem] rounded-full'>Complted</p>
                                    ):(
                                        <p className='p-2 text-center bg-red-400 w-[6rem] rounded-full'>Pending</p> 
                                    )}
                                </td>
                                <td className='py-2 px-2'>
                                    {order.isDelivered ? (
                                        <p className='p-2 text-center bg-green-400 w-[6rem] rounded-full'>Delivered</p>
                                    ):(
                                        <p className='p-2 text-center bg-red-400 w-[6rem] rounded-full'>Pending</p> 
                                    )}
                                </td>

                                <td className='py-2 px-2'>
                                    <Link to={`/order/${order._id}`}>
                                        <button className='bg-pink-400  py-2 px-3 rounded'>
                                            View Details
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default UserOrders