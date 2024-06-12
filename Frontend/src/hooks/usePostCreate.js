import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import usePostsStore from '../zustand/usePostsStore';

const usePostCreate = () => {
  const [loading, setLoading] = useState(false);
  const addPost = usePostsStore((state) => state.addPost);

  const createPost = useCallback(async ({ author, content }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/post', { author, content });
      const newPost = response.data; 
      addPost(newPost);
      setLoading(false);
    } catch (error) {
      // Обработка ошибок при создании поста
      console.error('Ошибка при создании поста:', error);
      setLoading(false);
    }
  }, [addPost]);

  return { createPost, loading };
};

export default usePostCreate;
// const export default usePostCreate; = () => {
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState(null);

//   const createPost = async ({ author, content }) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post('/api/post', { author, content });
//       setLoading(false);
//       const newPost = response.data; // Исправление: заменить posts на response.data
//       usePostsStore.getState().setPosts(prevPosts => {
//         if (Array.isArray(prevPosts)) {
//           return [newPost, ...prevPosts];
//         } else {
//           console.error('Error: prevPosts is not an array');
//           return prevPosts;
//         }
//       });

//       return newPost;
//     } catch (error) {
//       setLoading(false);
//       if (error.response && error.response.data && error.response.data.error) {
//         toast.error(error.response.data.error);
//       } else {
//         toast.error('An error occurred while creating the post');
//       }
//       throw error;
//     }
//   };

//   return { createPost, loading, error };
// };
