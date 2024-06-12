import React from 'react';
import Status from './status/Status';
import { AvatarUploader } from './AvatarUploader/AvatarUploader';
import ProfileEdit from './editProfile/ProfileEdit';
import { FaCopy } from 'react-icons/fa';

const UserProfileCard = ({ isAuthUserProfile, userId, viewedProfile, viewedUser }) => {

  const avatar = viewedUser.profilePic
  const user = viewedUser
  const posts = viewedProfile.posts

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  };
 
  return (
    <div className="bg-gray-200 border-b relative mb-5">
      {/* Cover Image */}
      <div className="h-32 bg-gray-400 rounded-tl"></div>

      {/* Avatar and User Info */}
      <div className="flex items-center border-b flex-col bg-white p-4 rounded-b">
        <div className="h-24 w-24 bg-gray-300 rounded-full overflow-hidden absolute" style={{ top: '80px' }}>
          <img
            src={`/uploads/${avatar}`}
            alt="Avatar"
            className="w-full h-full object-cover"
            onClick={() => document.getElementById('my_modal_3').showModal()}
          />
          {isAuthUserProfile && <AvatarUploader />}
        </div>
        <div className="ml-4">
          <h1 className="text-xl font-semibold">{user.fullName}</h1>
          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none btn-ghost rounded flex "
            onClick={() => copyToClipboard(user.username)}
          >
            {user.username} <FaCopy />
          </button>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-gray-600">Подписчиков: {user.subscriptions.length}</p>
            <p className="text-gray-600">Посты: {posts.length}</p>
            <p className="text-gray-600">Харизма: No</p>
          </div>
          <Status authUser={userId} isAuthUserProfile={isAuthUserProfile} viewedUser={viewedUser} />
        </div>
      </div>
      {isAuthUserProfile && (
        <div>
          <button
            className="mt-4 bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300 absolute top-4 right-4"
            onClick={() => document.getElementById('my_modal_4').showModal()}
          >
            Изменить профиль
          </button>
          <ProfileEdit avatar={avatar} authUser={userId} isAuthUserProfile={isAuthUserProfile}
           viewedProfile={viewedProfile} viewedUser={viewedUser}/>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;