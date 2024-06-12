import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import unsubscribeToUser from '../../../hooks/actionsUsers/useUnsubscribe';
import subscribeToUser from '../../../hooks/actionsUsers/useSubscribe';

export const FriendModal = ({ friends }) => {
    const [subscriptions, setSubscriptions] = useState(friends.reduce((acc, friend) => {
        acc[friend._id] = true;
        return acc;
    }, {}));
    
    const handleUnsubscribe = async (friendId) => {
        try {
            await unsubscribeToUser(friendId);
            setSubscriptions(prevState => ({ ...prevState, [friendId]: false }));
        } catch (error) {
            console.error('Ошибка при удалении подписки:', error);
        }
    };

    const handleSubscribe = async (friendId) => {
        try {
            await subscribeToUser({ subscriber: authUser._id, targetUser: friendId });
            setSubscriptions(prevState => ({ ...prevState, [friendId]: true }));
        } catch (error) {
            console.error('Ошибка при создании подписки:', error);
        }
    };

    return (
        <dialog id="modal_friends" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Список друзей</h3>
                <ul className="space-y-2">
                    {friends.map((friend) => (
                        <li key={friend._id} className="flex items-center w-full gap-8 justify-between">
                            <Link to={`${friend._id}`}>
                                <img src={`../../../../public/uploads/` + friend.avatar} alt={`Avatar of ${friend.username}`} className="w-16 h-16 rounded-full" />
                            </Link>
                            <div>
                                <Link to={`${friend._id}`}>
                                    <span className="text-gray-700">{friend.username}</span>
                                </Link>
                                <p>написать сообщение</p>
                            </div>
                            {subscriptions[friend._id] ? (
                                <button className='btn btn-success' onClick={() => handleSubscribe(friend._id)}>
                                    Подписаться
                                </button>
                            ) : (
                                <button className='btn btn-error' onClick={() => handleUnsubscribe(friend._id)}>
                                    Отписаться
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </dialog>
    );
};