import React from 'react'
import Conversation from './Conversation'
import useGetConvesations from '../../hooks/useGetConvesations'

const Conversations = () => {
  const { loading, conversations } = useGetConvesations()
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {conversations.map((conversation, idx) => (
          <Conversation 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversation.length - 1}
          />
        ))}
       {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations