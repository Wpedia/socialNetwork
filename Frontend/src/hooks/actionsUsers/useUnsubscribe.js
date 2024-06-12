import axios from "axios"
import toast from 'react-hot-toast'

const unsubscribeToUser = async (targetUserId) => {
    try {
        await axios.delete(`/api/users/unsubscribe/${targetUserId}`);
    } catch (error) {
        toast.error('Ошибка при удалении подписки::', error);
    }
};

export default unsubscribeToUser;
