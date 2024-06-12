import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useGetViewedProfile = (userIdToFetch) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/profile/${userIdToFetch}`);
                const { profile, user } = response.data;
                setProfile(profile);
                setUser(user);
            } catch (error) {
                toast.error(error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userIdToFetch]);

    return { loading, error, profile, user };
};

export default useGetViewedProfile;
// const useGetProfile = (userIdToFetch) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { setAvatar, setStatus } = useProfileStore()
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/profile/${userIdToFetch}`);
//                 const { profile, user } = response.data;
//                 useProfileStore.getState().setProfileAndUser(profile, user);
//                 setAvatar(user.profilePic)
//                 setStatus(user.status)
//             } catch (error) {
//                 toast.error(error.message)
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();

//     }, [userIdToFetch]);

//     return { loading, error, profile, user };
// };

// export default useGetProfile;