// Leaders.js

import React, { useState } from 'react';
import LeaderSidebar from '../../components/leaders/LeaderSidebar';

const Leaders = () => {
    // Предположим, что у вас есть массив объектов с информацией о лидерах
    const [leaders] = useState([
        { id: 1, username: 'User1', charisma: 100, followers: 500 },
        { id: 2, username: 'User2', charisma: 90, followers: 450 },
        // Добавьте больше объектов по аналогии
    ]);

    const [selectedLeader, setSelectedLeader] = useState(null);

    const handleClick = (leader) => {
        setSelectedLeader(leader);
    };

    return (
        <div className="flex">
            <div className="flex-1 overflow-y-scroll px-10">
                <h2 className="text-xl font-semibold mb-4">Leaders</h2>
                <ul>
                    {leaders.slice(0, 100).map((leader, index) => (
                        <li key={leader.id} className="flex items-center mb-4 rounded-md bg-white p-2 justify-between">
                            <div className='flex gap-4'>
                                <img src={`https://sun9-33.userapi.com/impg/m3LTUmFlv9CnnkRGK22PamQqiz0CMCglh_zBaA/zWre6DyO3uo.jpg?size=700x700&quality=95&sign=0eaa7a7fdbe0ba654651a40eca199cc5&type=album`} 
                                alt={`Avatar of ${leader.username}`} className="w-16 h-16 rounded-full mr-4" />
                                <div>
                                    <p className="font-semibold">{leader.username}</p>
                                    <p>Харизма: {leader.charisma}</p>
                                    <p>Подписчики: {leader.followers}</p>
                                </div>
                            </div>

                            <button onClick={() => handleClick(leader)}>Профиль</button>
                        </li>
                    ))}                    
                </ul>
            </div>
            <div className='w-3/12 ml-12'>
                
            </div>
            {selectedLeader && <LeaderSidebar leader={selectedLeader} />}
        </div>
    );
};

export default Leaders;
