import React from 'react'
import { useNavigate } from 'react-router-dom';
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({ conversation, lastIdx}) => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)

  
  return (
    <div>
      <div className={`flex gap-2 items-center hover:bg-gray-400 rounded p-2 py-1 cursor-pointer
       ${isSelected ? "bg-gray-400" : ""}`}
       onClick={() => setSelectedConversation(conversation)}
       >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img 
            src={`/uploads/${conversation.profilePic}`}
             alt="user avatar" />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-black'>
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
    </div>
  )
}

export default Conversation