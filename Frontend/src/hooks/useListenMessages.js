import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notification from '../assets/sounds/notification.mp3';
import useNotificationStore from '../zustand/useNotification';
import axios from 'axios';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    const handleNewMessage = async (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      const response = await axios.get(`/api/profile/${newMessage.senderId}`);
      const user = response.data.user;
      
      addNotification({
        id: Date.now(),
        message: `От ${user.fullName}: "${newMessage.message}"`,
        avatar: user.profilePic // добавляем аватарку в уведомление
      });

      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);
    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, setMessages, messages, addNotification]);
};

export default useListenMessages;

// import React, { useEffect } from 'react'

// import { useSocketContext } from '../context/SocketContext'
// import useConversation from '../zustand/useConversation'

// import notification from '../assets/sounds/notification.mp3'

// const useListenMessages = () => {
//   const {socket} = useSocketContext()
//   const {messages, setMessages} = useConversation()

//   useEffect(()=>{
//     socket?.on("newMessage", (newMessage) => {
//       newMessage.shouldShake = true
//       const sound = new Audio(notification)
//       sound.play()
//       setMessages([...messages, newMessage])
//     })
//     return () => socket?.off("newMessage")
//   },[socket, setMessages, messages])
// }

// export default useListenMessages