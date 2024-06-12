import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessagesSkeletons from '../skeletons/MessagesSkeletons'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView()
      }, 100);
  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto '>
      {!loading && messages.length > 0 &&
        messages.map((messages) =>
          <div key={messages._id}
            ref={lastMessageRef}>
            <Message messages={messages}
            />
          </div>
        )}

      {loading && [...Array(3)].map((_, idx) => <MessagesSkeletons key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-700'>Сообщений пока нет</p>
      )}
    </div>
  )
}

export default Messages