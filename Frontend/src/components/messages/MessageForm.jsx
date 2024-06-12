import React, { useState } from 'react'
import { AiOutlineSend } from "react-icons/ai";
import useSendMessage from '../../hooks/useSendMessage';

const MessageForm = () => {
  const [message, setMessage] = useState("")
  const { sendMessage, loading } = useSendMessage()
  

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    if (!message) return
    await sendMessage(message)
    setMessage("")
  }
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input type="text"
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-100 border-gray-600 text-black'
          placeholder='Сообщение'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading ? <div className='loading loading-spinner'></div>: <AiOutlineSend className="text-gray-500" />}
        </button>
      </div>
      {/* <div className='h-20'>

      </div> */}
    </form>
  )
}

export default MessageForm