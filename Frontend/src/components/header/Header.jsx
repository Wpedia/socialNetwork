import React, { useState } from 'react';
import LogoutButton from '../../utils/LogoutButton';
import useProfileStore from '../../zustand/useProfileStore';

const Header = ({ title }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { avatar, user } = useProfileStore(state => ({
    avatar: state.avatar,
    user: state.user,
  }));

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Поиск"
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md"
            >

              {user ? (
                <>
                  <img
                    src={`/uploads/${avatar}`}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.fullName}</span>
                </>

              ) : (
                <div className='loading loading-bars'></div>
              )}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1 z-10">
                <a href="#settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Настройки</a>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
