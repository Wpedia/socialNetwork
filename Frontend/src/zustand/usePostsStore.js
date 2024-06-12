import {create} from 'zustand';

const usePostsStore = create((set) => ({
  posts: [],

  setPosts: (newPosts) => set({ posts: newPosts }),

  addPost: (newPost) => set((state) => ({ posts: [...state.posts, newPost] })),
}));

export default usePostsStore;
