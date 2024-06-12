import React, { useEffect, useState } from 'react';
import { PostHeader } from './post/PostHeader';
import { PostContent } from './post/PostContent';
import { PostFooter } from './post/PostFooter';
import useGetPostsByIds from '../../hooks/useGetPostsByIds';
import usePostsStore from '../../zustand/usePostsStore';
import useProfileStore from '../../zustand/useProfileStore';

const UserProfilePost = ({ viewedProfile, viewedUser}) => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [CurrentPosts, setCurrentPosts] = useState({})

  const avatar = viewedUser.profilePic

  const { posts, setPosts } = usePostsStore() 

  const { loading  } = useGetPostsByIds(viewedProfile.posts);

  useEffect(()=>{
    setCurrentPosts(posts)
  },[posts, setPosts])
  
  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const recentPosts = CurrentPosts.slice(-visiblePosts).reverse(); 

  return (
    <>
      {recentPosts.length > 0 ? (
        <>
          {recentPosts.map((post) => (
            <div key={post._id} className="bg-white p-4  border-r border-b">
              <PostHeader username={viewedUser.fullName} profilePic={`/uploads/${avatar}`}
                timeAt={post.createdAt} postId={post._id} />
              <PostContent content={post.content} />
              <PostFooter />
            </div>
          ))}
          {visiblePosts < posts.length && (
            <button onClick={handleLoadMore} className="mt-4 py-2 px-4 rounded bg-slate-300 hover:bg-slate-400 text-black">
              Загрузить еще
            </button>
          )}
        </>
      ) : (
        <div className="bg-white rounded shadow p-4 mb-4">
          <p>Добавьте первый пост</p>
        </div>
      )}
    </>
  );
};

export default UserProfilePost;
