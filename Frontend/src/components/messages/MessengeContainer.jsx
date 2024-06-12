import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageForm from './MessageForm'
import { AiFillWechat } from "react-icons/ai";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';


const MessengeContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const {authUser} = useAuthContext()

    useEffect(()=>{
        return () => setSelectedConversation(null)
    },[setSelectedConversation])
    return (
        <div className='w-full flex flex-col'>
            {!selectedConversation ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <div 
                    className='px-4 text-center sm:text-lg md:text-xl text-black 
                    font-semibold flex flex-col items-center gap-2'>
                        <p>Добро пожаловать, {authUser.fullName}</p>
                        <p> Выберите чат для общения</p>
                        <AiFillWechat className='text-3xl md:text-6xl text-center'/>
                    </div>
                </div>
            ) : (
                <>
                    <div className='bg-slate-100 px-4 py-2 mb-2'>
                        <span className='text-gray-900 font-bold'>
                            {selectedConversation.fullName}
                        </span>
                    </div>
                    <Messages />
                    <MessageForm />
                </>
            )}
        </div>
    )
}

export default MessengeContainer