import React, { useState, useEffect } from 'react';
import useGetConversations from '../../hooks/useGetConvesations';
import { useAuthContext } from '../../context/AuthContext';
import unsubscribeToUser from '../../hooks/actionsUsers/useUnsubscribe';
import subscribeToUser from '../../hooks/actionsUsers/useSubscribe';
import useUserSubscriptions from '../../hooks/useUserSubscriptions';

const UsersPage = () => {
    const { loading: conversationsLoading, conversations } = useGetConversations();
    const { authUser } = useAuthContext();
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const { subscriptions, loading: subscriptionsLoading, getUserSubscriptions } = useUserSubscriptions();

    useEffect(() => {
        setUsers(conversations);
    }, [conversations]);

    const handleSubscribe = async (targetUserId) => {
        try {
            await subscribeToUser({ subscriber: authUser._id, targetUser: targetUserId });
            getUserSubscriptions();
        } catch (error) {
            console.error('Ошибка при создании подписки:', error);
        }
    };

    const handleUnsubscribe = async (targetUserId) => {
        try {
            await unsubscribeToUser(targetUserId);
            getUserSubscriptions();
        } catch (error) {
            console.error('Ошибка при удалении подписки:', error);
        }
    };

    const isUserSubscribed = (userId) => {
        return subscriptions.some(subscription => subscription._id === userId);
    };

    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="space-y-8 px-4 py-8 m:h-[450px] md:h-[550px]">
            <input
                type="text"
                placeholder="Введите имя пользователя"
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="space-y-4">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-white p-4 rounded-md shadow-md flex items-center justify-between gap-10">
                        <div>
                            <img src={`/uploads/${user.profilePic}`} className='w-12 rounded-full' alt={user.fullName} />
                        </div>
                        <div className='text-center'>
                            <h3 className="font-semibold">{user.fullName}</h3>
                            <p>{user.status}</p>
                        </div>
                        {isUserSubscribed(user._id) ? (
                            <button
                                className="bg-gray-300 text-black py-2 px-4 rounded-md shadow-md hover:bg-gray-400 w-36"
                                onClick={() => handleUnsubscribe(user._id)}
                            >
                                Отписаться
                            </button>
                        ) : (
                            <button
                                className="bg-gray-300 text-black py-2 px-4 rounded-md shadow-md hover:bg-gray-400 w-36"
                                onClick={() => handleSubscribe(user._id)}
                            >
                                Добавить в друзья
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {(conversationsLoading || subscriptionsLoading) && <div className="space-y-8 px-4 py-8 m:h-[450px] md:h-[550px] flex justify-center">
                 <div className='loading loading-spinner w-14'>
                 </div></div>}
        </div>
    );
};

export default UsersPage;