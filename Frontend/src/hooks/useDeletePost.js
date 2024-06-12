import axios from "axios"
import toast from 'react-hot-toast'

const deletePost = async ({ postId, setPosts }) => {
    try {
      await axios.delete(`/api/post/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      toast.success('Пост успешно удален');
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };
  
export default deletePost
