import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    })

    const { loading, signup } = useSignup()

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(inputs)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className=' p-6 rounded-lg shadow-md bg-white'>
                <h1 className='text-3xl font-semibold text-center text-black'>
                    Присоединяйся к <span> VitalConnect</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Никнейм</span>
                        </label>
                        <input type="text" placeholder='Псевдоним' className='w-full input input-bordered h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs(prevState => ({ ...prevState, fullName: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Логин</span>
                        </label>
                        <input type="text" placeholder='Логин' className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs(prevState => ({ ...prevState, username: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Пароль</span>
                        </label>
                        <input type="password" placeholder='Пароль' className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs(prevState => ({ ...prevState, password: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-black'>Повторите пароль</span>
                        </label>
                        <input type="password" placeholder='Повторный пароль' className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs(prevState => ({ ...prevState, confirmPassword: e.target.value }))}
                        />
                    </div>
                    <GenderCheckbox
                        onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}
                    />
                    <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-black'>
                        Уже есть аккаунт?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2 text-black'
                        disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Вход"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup