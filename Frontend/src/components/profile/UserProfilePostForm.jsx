import React, { useState } from 'react';
import usePostCreate from '../../hooks/usePostCreate';
import toast from 'react-hot-toast';

export const UserProfilePostForm = ({ authorId }) => {
    const { createPost, loading, error } = usePostCreate();
    const [postData, setPostData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payloadNewPost = await createPost({ author: authorId, content: postData })
            toast.success('Post created successfully');
            setPostData('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    return (
        <div>
            <form className='bg-white p-4 border-b  border-r' onSubmit={handleSubmit}>
                <div className='w-full relative'>
                    <textarea
                        className="w-full h-20 border-gray-300 resize-none mb-2 px-3 py-2 rounded-md focus:outline-none"
                        placeholder="О чем ты думаешь?"
                        value={postData}
                        onChange={(e) => setPostData(e.target.value)}>
                    </textarea>
                    <button 
                    type='submit'
                    className="mt-4 bg-slate-200 text-black px-4 py-2 rounded hover:bg-slate-300"
                    disabled={loading}
                    >
                        {loading ? (
                        <div className='loading loading-spinner'></div>
                    ) : (
                        'Опубликовать'
                    )}
                    </button>
                </div>
            </form>
            {error && <div>Error: {error.message}</div>}
        </div>


    );
};



<div className="max-w-screen-lg mx-auto">
    Post Form
    <div className="bg-white p-4 rounded-lg shadow-md my-4">
        <textarea className="w-full h-20 border-gray-300 resize-none mb-2 px-3 py-2 rounded-md focus:outline-none" placeholder="What's on your mind?"></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Post</button>
    </div>
    {/* Posts */}
    <div className="space-y-4">
        {/* Sample Post */}
        <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Sample Post Content</p>
        </div>

        {/* More posts go here... */}
    </div>
</div>