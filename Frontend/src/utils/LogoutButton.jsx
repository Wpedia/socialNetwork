import React from 'react'
import { LuLogOut } from "react-icons/lu";
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {

  const {loading, logout}= useLogout()
  return (
    <button className='btn btn-ghost btn-circle'>
        {!loading ? (
        <LuLogOut className="w-5 h-5 text-black cursor-pointer"
        onClick={logout} />
        ) : (
          <span className='loading loading-spinner'></span>
        )}
    </button>
  )
}

export default LogoutButton