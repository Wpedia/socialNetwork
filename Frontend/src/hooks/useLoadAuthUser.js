import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useProfileStore from '../zustand/useProfileStore';

const useLoadAuthUser = (userId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setProfileAndUser, setAvatar, setStatus } = useProfileStore();

    useEffect(() => {
        const fetchAuthUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/profile/${userId._id}`);
                const { profile, user } = response.data;
                setProfileAndUser(profile, user);
                setAvatar(user.profilePic);
                setStatus(user.status);
            } catch (error) {
                toast.error(error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthUser();
    }, [userId, setProfileAndUser, setAvatar, setStatus]);

    return { loading, error };
};

export default useLoadAuthUser;
