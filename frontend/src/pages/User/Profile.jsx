import React, { useEffect, useState } from 'react'
import { useProfileMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { setCredentials } from '../../redux/features/Auth/authSlice';

const Profile = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Password does not match")
        } else {
            try {
                const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success("Profile updated successfully")
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }


    return (
        <div className='container mx-auto p-4 mt-[10rem]'>
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>

                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className='block mb-2'>Name</label>
                            <input type="text" id="username" className='mt-1 p-2 border w-full bg-gray-950' value={username} onChange={e => setUsername(e.target.value)} />
                        </div>

                        {/* email comp */}
                        <div className="my-[2rem]">
                            <label htmlFor="email" className='block text-sm font-medium'>Email Address</label>
                            <input type="email" id="email" className='mt-1 p-2 border w-full bg-gray-950' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        {/* pass comp */}
                        <div className="my-[2rem]">
                            <label htmlFor="password" className='block text-sm font-medium'>Password</label>
                            <input placeholder='Enter Password' type="password" name="password" id="password" className='mt-1 p-2 border w-full bg-gray-950' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        {/* confirm pass comp */}
                        <div className="my-[2rem]">
                            <label htmlFor="confirmPassword" className='block text-sm font-medium'>Confirm Password</label>
                            <input placeholder='Confirm Password' type="password" name="" id="confirmPassword" className='mt-1 p-2 border w-full bg-gray-950' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>

                        <div className='flex justify-between'>
                            <button type='submit' className='bg-pink-500 py-2 px-4 rounded hover:bg-pink-600'>Update</button>
                            <Link to='/user-orders' className='bg-pink-600 py-2 px-4 rounded hover:bg-pink-700'>My Orders</Link>
                        </div>
                    </form>
                </div>

                {loadingUpdateProfile && <Loader />}
            </div>
        </div>
    )
}

export default Profile