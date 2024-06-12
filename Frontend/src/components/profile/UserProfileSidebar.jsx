import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FriendModal } from './ModalFriendsAndSubs/FriendModal';

export const UserProfileSidebar = ({ userIdToFetch }) => {
    const [friends, setFriends] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);

    useEffect(() => {

        axios.get(`/api/users/${userIdToFetch}/friends`)
            .then(response => {
                const userData = response.data;
                const friendsData = userData.friends;
                setFriendsCount(friendsData.length);

                
                const friendsInfo = friendsData.map(friend => ({
                    _id: friend._id,
                    username: friend.username,
                    avatar: friend.profilePic 
                }));

                setFriends(friendsInfo.slice(0, 3)); 
            })
            .catch(error => {
                console.error('Ошибка при получении друзей:', error);
            });
    }, [userIdToFetch]);

    const renderAvatar = (user) => {
        if (user.avatar) {
            return <img src={`/uploads/${user.avatar}`} alt={`User Avatar`} />;
        } else {
            return (
                <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                    <span className="text-gray-500">No Image</span>
                </div>
            );
        }
    };

    const renderPlaceholder = (count) => {
        if (count > 3) {
            const remaining = count - 3;
            return (
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content">
                        <span>+{remaining}</span>
                    </div>
                </div>
            );
        }
        return null;
    };


    return (
        <div className="col-span-2 ">
            {/* Друзья */}
            <div className="bg-white p-4 border-b rounded" onClick={() => document.getElementById('modal_friends').showModal()}>
                <h2 className="text-xl font-semibold mb-4">Друзья ({friendsCount})</h2>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    {friends.map((friend, index) => (
                        <div key={index} className="avatar">
                            <div className="w-16">
                                {renderAvatar(friend)}
                            </div>
                        </div>
                    ))}
                    {renderPlaceholder(friendsCount)}
                </div>
                <FriendModal friends={friends} />
            </div>
        </div>
    );
};
