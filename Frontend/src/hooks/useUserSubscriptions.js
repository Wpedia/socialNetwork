import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserSubscriptions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/users/subscriptions');
            setSubscriptions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка при получении подписок:', error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserSubscriptions();
    }, []);

    return { subscriptions, loading, error, getUserSubscriptions };
};

export default useUserSubscriptions;
