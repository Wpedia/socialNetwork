import React, { useEffect, useRef, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { useAuthContext } from '../../../context/AuthContext';
import useUpdateStatus from '../../../hooks/useUpdateStatus';

const Status = ({ isAuthUserProfile, viewedUser }) => {
    const { authUser } = useAuthContext();
    const [status, setStatus] = useState(viewedUser?.status || '');
    const [editing, setEditing] = useState(false);
    const [newStatus, setNewStatus] = useState(status);
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    const { updateStatus } = useUpdateStatus();
    
    useEffect(() => {
        if (viewedUser?.status) {
            setStatus(viewedUser.status);
        }
    }, [viewedUser?.status]);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    const handleEditClick = () => {
        setEditing(true);
        setNewStatus(status);
    };

    const handleSaveClick = async () => {
        if (newStatus !== status) {
            try {
                await updateStatus(newStatus, authUser._id);
                setStatus(newStatus);
            } catch (error) {
                console.error('Ошибка при сохранении статуса:', error);
            }
        }
        setEditing(false);
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

    if (!viewedUser) {
        return null;
    }

    return (
        <div>
            {isAuthUserProfile ? (
                <div ref={wrapperRef}>
                    {editing ? (
                        <div className='flex flex-row gap-4'>
                            <input 
                                ref={inputRef}
                                value={newStatus} 
                                onChange={(e) => setNewStatus(e.target.value)} 
                            />
                            <button className='btn btn-xs' onClick={handleSaveClick}><FaCheck /></button>
                        </div>
                    ) : (
                        <p onClick={handleEditClick}>{status}</p>
                    )}
                </div>
            ) : (
                <p>{viewedUser.status}</p>
            )}
        </div>
    );
};

export default Status;
