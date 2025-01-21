import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/Auth/authSlice'

const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
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

        if (password !== confirmPassword) {
            toast.error("Password does not match")
        } else {
            try {

                const res = await register({ username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate(redirect)
                toast.success("User registered successfully")

            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }

    }


    return (
        <section className='pl-[10rem] flex flex-wrap'>
            {/* user register */}
            <div className='mr-[4rem] mt-[5rem]  w-[35%]'>
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                {/* register form */}
                <form onSubmit={submitHandler} className='container'>
                    {/* username comp */}
                    <div className="my-[2rem]">
                        <label htmlFor="username" className='block text-sm font-medium'>Username</label>
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
                        <input type="password" name="password" id="password" className='mt-1 p-2 border w-full bg-gray-950' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {/* confirm pass comp */}
                    <div className="my-[2rem]">
                        <label htmlFor="confirmPassword" className='block text-sm font-medium'>Confirm Password</label>
                        <input type="password" name="" id="confirmPassword" className='mt-1 p-2 border w-full bg-gray-950' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>

                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'>
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                </form>

                {/* already account login */}
                <div className="mt-4">
                    <p className='text-white'>
                        Already have an account? {" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-pink-500 hover:underline' >
                            Login
                        </Link>
                    </p>
                </div>
            </div>

            <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt=""
                className="h-[97vh] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
            />
        </section>
    )
}

export default Register