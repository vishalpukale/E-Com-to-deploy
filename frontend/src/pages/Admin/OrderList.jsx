import React from 'react'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { Link } from 'react-router'
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from '../Admin/AdminMenu'


const OrderList = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery()

  return (
    <>
      {isLoading ? (<Loader />) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <AdminMenu />
          <table className='container mx-auto mt-11' >
            <thead className='w-full border text-left'>
              <tr className='mb-[5rem]'>
                <th className='py-2 pl-1'>Image</th>
                <th className='py-2 pl-1'>Id</th>
                <th className='py-2 pl-1'>User</th>
                <th className='py-2 pl-1'>Date</th>
                <th className='py-2 pl-1'>Total</th>
                <th className='py-2 pl-1'>Paid</th>
                <th className='py-2 pl-1'>Delivered</th>
                <th className='py-2 pl-1'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <img src={order.orderItems[0].image} alt={order.user} className='w-[6rem] mb-5' />
                  <td className='py-2'>{order._id}</td>
                  <td className='py-2'>{order.user ? order.user.username : 'N/A'}</td>
                  <td className='py-2'>{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                  <td className='py-2'>Rs {order.totalPrice}</td>
                  
                  <td className='py-2'>
                    {order.isPaid ? (
                      <p className='p-2 text-center bg-green-400 w-[6rem] rounded-full'>Complted</p>
                    ) : (
                      <p className='p-2 text-center bg-red-400 w-[6rem] rounded-full'>Pending</p>
                    )}
                  </td>
                  <td className='py-2 px-2'>
                    {order.isDelivered ? (
                      <p className='p-2 text-center bg-green-400 w-[6rem] rounded-full'>Delivered</p>
                    ) : (
                      <p className='p-2 text-center bg-red-400 w-[6rem] rounded-full'>Pending</p>
                    )}
                  </td>

                  <td className='py-2 px-2'>
                    <Link to={`/order/${order._id}`}>
                      <button className='bg-pink-400  py-2 px-3 rounded'>
                        More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}

export default OrderList