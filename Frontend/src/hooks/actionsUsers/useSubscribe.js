import axios from "axios"
import toast from 'react-hot-toast'

const subscribeToUser = async ({ subscriber, targetUser }) => {
    try {
        await axios.post('/api/users/subscribe', { subscriber , targetUser });
    } catch (error) {
        toast.error('Ошибка при удалении подписки::', error);
    }
};

export default subscribeToUser
