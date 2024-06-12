import deletePost from "../../../hooks/useDeletePost";
import { extractTime } from "../../../utils/extractTimeForPost";
import { MdDeleteOutline } from "react-icons/md";
import usePostsStore from "../../../zustand/usePostsStore";

export const PostHeader = ({ profilePic, username, timeAt, postId }) => {

  const { setPosts } = usePostsStore()

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
      await deletePost({postId, setPosts});
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center mb-2">
        <img src={profilePic} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-gray-600">{extractTime(timeAt)}</p>
        </div>
      </div>
      <div className="float-end">
        <button onClick={handleDelete}>
          <MdDeleteOutline className="scale-150" />
        </button>
      </div>
    </div>
  );
}
