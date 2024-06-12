import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading, login} = useLogin()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(username,password)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='rounded-md bg-white p-8'>
                <h1 className='text-3xl font-semibold text-center text-black'>Возвращайся в 
                          VitalConnect
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Логин</span>
                        </label>
                        <input type="text" placeholder="Логин" className="input input-bordered w-full " 
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Пароль</span>
                        </label>
                        <input type="password" placeholder="Пароль" className="input input-bordered w-full" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black'>
                        У вас нет аккаунта?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2'
                        disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Вход"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login