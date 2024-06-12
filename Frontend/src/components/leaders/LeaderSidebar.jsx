import './LeaderSidebar.css'; 
import React from 'react';

const LeaderSidebar = ({ leader }) => {
  return (
    <div className="leader-sidebar p-1">
      <h2 className="text-xl font-semibold mb-4">Leader Info</h2>
      <div className="p-4 rounded">
        <p className="font-semibold">{leader.username}</p>
        <p>Charisma: {leader.charisma}</p>
        <p>Followers: {leader.followers}</p>
      </div>
    </div>
  );
};

export default LeaderSidebar;