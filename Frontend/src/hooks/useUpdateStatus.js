import axios from 'axios';

const useUpdateStatus = () => {
    const updateStatus = async (newStatus, authUserId) => {
        try {
            await axios.put(`/api/users/${authUserId}/status`, { status: newStatus });
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            throw error;
        }
    };

    return { updateStatus };
};

export default useUpdateStatus;