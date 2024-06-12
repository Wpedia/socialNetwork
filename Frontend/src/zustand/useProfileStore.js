import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from './API_URL';

const useProfileStore = create((set) => ({
  avatar: null,
  status: null,
  setAvatar: (newAvatar) => set({ avatar: newAvatar }),
  setStatus: (newStatus) => set({status: newStatus}),
  setProfileAndUser: (profile, user) => set({ profile, user }),
  uploadAvatar: async (avatar, authUser) => {
    try {
      const formData = new FormData();
      formData.append('file', avatar);
      formData.append('userId', authUser);
      const response = await axios.post(
        `${API_URL}users/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      set({
         avatar: response.data.profilePic,
         })
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  }
}));

export default useProfileStore;