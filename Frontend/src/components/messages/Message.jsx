import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({ messages }) => {
  const { authUser } = useAuthContext()
  const { selectedConversation } = useConversation()
  const fromMe = messages.senderId === authUser._id
  const formattedTime = extractTime(messages.createdAt)
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  // const fullName = fromMe ? authUser.fullName : selectedConversation?.fullName
  const bubbleBgColor = fromMe ? "bg-gray-100" : "bg-gray-100"
  const shakeClass = messages.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          
          <img src={`/uploads/${profilePic}`} alt="avatar user" />
        </div>
      </div>
      <div className={`chat-bubble text-black ${bubbleBgColor} ${shakeClass} pb-2 break-words max-w-96`}>
        {messages.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message