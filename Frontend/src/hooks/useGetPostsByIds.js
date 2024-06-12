import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
import usePostsStore from '../zustand/usePostsStore';



const useGetPostsByIds = (postIds) => {
  const [loading, setLoading] = useState(true);
  const { setPosts } = usePostsStore();

  useEffect(() => {
    const fetchPosts = async () => {
    try {
      const postRequests = postIds.map(async (postId) => {
        const response = await axios.get(`/api/post/${postId}`);
        return response.data;
      });
      const postsData = await Promise.all(postRequests);
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Ошибка загрузки постов');
    }}
    fetchPosts()
  }, [setPosts]);

  return { loading };
};

export default useGetPostsByIds;
