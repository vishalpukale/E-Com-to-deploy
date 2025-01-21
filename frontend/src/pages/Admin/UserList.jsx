import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../redux/api/usersApiSlice'
import Message from '../../components/Message'


const UserList = () => {

  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editableUserId, setEditableUserId] = useState(null)
  const [editableUserName, setEditableUserName] = useState('')
  const [editableUserEmail, setEditableUserEmail] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch])


  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
      } catch (error) {
        toast.error(error.data.message || error.error)
      }
    }
  }

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id)
    setEditableUserName(username)
    setEditableUserEmail(email)
  }

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      })

      setEditableUserId(null)
      refetch()
    } catch (error) {
      toast.error(error.data.message || error.error)
    }
  }


  return (
    <div className='p-4'>
      {isLoading ? (<Loader />) :
        (error ? (
          <Message variant='danger'>
            {error?.data.message || error.message}
          </Message>
        ) : (
          <div className='flex flex-col md:flex-row'>

            <table className='w-full md:w-4/5 mx-auto'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-left'>ID</th>
                  <th className='px-4 py-2 text-left'>NAME</th>
                  <th className='px-4 py-2 text-left'>EMAIL</th>
                  <th className='px-4 py-2 text-left'>ADMIN</th>
                </tr>
              </thead>

              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    {/* id */}
                    <td className='px-4 py-2 text-left'>{user._id}</td>

                    {/* username editable by admin */}
                    <td className='px-4 py-2 text-left'>
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input className='w-full p-2 border rounded-lg bg-black' type="text" value={editableUserName} onChange={e => setEditableUserName(e.target.value)} />
                          <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 py-2 px-4 rounded-lg'>
                            <FaCheck />
                          </button>
                        </div>
                      ) : <div className='flex items-center'>
                        {user.username} {" "}
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className='ml-[1rem]' />
                        </button>
                      </div>}
                    </td>

                    {/* email editable by admin */}
                    <td className='px-4 py-2 text-left'>
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input className='w-full p-2 border bg-black rounded-lg' type="text" value={editableUserEmail} onChange={e => setEditableUserEmail(e.target.value)} />
                          <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 py-2 px-4 rounded-lg'>
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center'>
                          {user.email} {" "}
                          <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                            <FaEdit className='ml-[1rem]' />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* check user is admin or not */}
                    <td className='px-4 py-2 text-left'>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>

                    {/* if user is not admin then delete user by admin */}
                    <td className='px-4 py-2 text-left'>
                      {!user.isAdmin && (
                        <div className="flex">
                          <button className='bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded' onClick={() => deleteHandler(user._id)}>
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        )}
    </div>
  )
}

export default UserList