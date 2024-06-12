import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConvesations from '../../hooks/useGetConvesations';
import toast from 'react-hot-toast';


const SearchForm = () => {
    const [search, setSearch] = useState("")
    const {setSelectedConversation} = useConversation()
    const {conversations} = useGetConvesations()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!search) return
        if (search.length<3) {
            return toast.error('Search term must be at least 3 characters long');
        }

        const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
        if(conversation) {
            setSelectedConversation(conversation)
            setSearch('')
        } else {
            toast.error("No such user found")
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex items-center gap-2'>
            <input type="text" placeholder='Поиск...' className='input input-bordered rounded-full' 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button className='text-white bg-sky-500 btn-circle btn'>
                <FaSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchForm