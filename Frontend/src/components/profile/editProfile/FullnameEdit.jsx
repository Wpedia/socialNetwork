import React, { useEffect, useRef, useState } from 'react';
import useProfileStore from '../../../zustand/useProfileStore';
import { FaCheck } from "react-icons/fa";
import useUpdateStatus from '../../../hooks/useUpdateStatus';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

const FullnameEdit = ({ isAuthUserProfile, viewedUser}) => {
    const [editing, setEditing] = useState(false);
    const [newFullname, setNewFullname] = useState(viewedUser.fullName);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    const { authUser } = useAuthContext()

    useEffect(() => {
        setNewFullname(viewedUser.fullName);
    }, [viewedUser.fullName]);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    const handleEditClick = () => {
        setEditing(true);
        setNewFullname(viewedUser.fullName);
    };

    const handleSaveClick = async () => {
        try {
            if (newFullname !== viewedUser.fullName) {
                const response = await axios.put(`/api/users/${authUser._id}/fullname`, { fullName: newFullname });
                setProfileAndUser(response.data.user, response.data.user); 
            }
            setEditing(false);
        } catch (error) {
            console.error('Ошибка при обновлении имени пользователя:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setEditing(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div>
            {isAuthUserProfile ? (
                <div ref={wrapperRef}>
                    {editing ? (
                        <div className='flex flex-row gap-4'>
                            <input
                                ref={inputRef}
                                value={newFullname}
                                onChange={(e) => setNewFullname(e.target.value)}
                            />
                            <button className='btn btn-xs' onClick={handleSaveClick}><FaCheck /></button>
                        </div>
                    ) : (
                        <>
                            <p onClick={handleEditClick}>{viewedUser.fullName}</p>
                        </>
                    )}
                </div>

            ) : (
                <p>{viewedUser.fullName}</p>
            )}

        </div>
    );
};

export default FullnameEdit;