import React from 'react'
import Sidebar from '../../components/sidebarMessenger/Sidebar'
import MessageContainer from '../../components/messages/MessengeContainer'
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams();
  return (
    <>
      <div className='flex h-screen rounded-lg
     overflow-hidden bg-white'>
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  )
}

export default Home