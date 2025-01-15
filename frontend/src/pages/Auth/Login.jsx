import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'


import { useLoginMutation } from '../../redux/api/usersApiSlice'
import { setCredentials } from '../../redux/features/Auth/authSlice'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispath = useDispatch()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => { 
        e.preventDefault()
        try {

            const res = await login({ email, password }).unwrap()
            console.log(res)
            dispath(setCredentials({...res}))
            navigate(redirect)
            
        } catch (error) {
           toast.error(error?.data?.message || error.message) 
        }
    }

    return (
        <div>
            <section className='pl-[10rem] flex flex-wrap'>
                <div className='mr-[4rem] mt-[5rem]'>
                    {/* label */}
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>


                    <form onSubmit={submitHandler} action="" className='container w-[40rem]'>
                        {/* email comp */}
                        <div className="my-[2rem]">
                            <label htmlFor="email" className='block text-sm font-medium'>Email Address</label>
                            <input type="email" name="" id="email" className='mt-1 p-2 border w-full bg-gray-950' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        {/* pass comp */}
                        <div className="my-[2rem]">
                            <label htmlFor="password" className='block text-sm font-medium'>Password</label>
                            <input type="password" name="password" id="password" className='mt-1 p-2 border w-full bg-gray-950' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>

                        <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer'>
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader /> }
                    </form>

                    <div className="mt-4">
                        <p>
                            New Customer ? {" "} 
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-pink-500 hover:underline ml-2'>Register</Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login