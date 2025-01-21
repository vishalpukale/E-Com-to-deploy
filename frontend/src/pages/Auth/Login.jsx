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

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {

            const res = await login({ email, password }).unwrap()
            console.log(res)
            dispath(setCredentials({ ...res }))
            navigate(redirect)

        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    return (
        <div>
            <section className='pl-[12rem] flex flex-wrap'>
                <div className='mr-[4rem] mt-[5rem] w-[35%]'>
                    {/* label */}
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>


                    <form onSubmit={submitHandler} action="" className='container'>
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

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p>
                            New Customer ? {" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-pink-500 hover:underline ml-2'>Register</Link>
                        </p>
                    </div>
                </div>

                <img
                    src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
                    alt=""
                    className="h-[97vh] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
                />

            </section>
        </div>
    )
}

export default Login