import Post from '../models/post.model.js';
import Profile from '../models/profile.model.js';

export const createPost = async (req, res) => {
  try {
    const { author, content } = req.body;
    if (!content.trim()) {
      return res.status(400).json({ error: 'Content cannot be empty' });
    }

    const newPost = new Post({
      author,
      content,
    });

    const savedPost = await newPost.save();

    
    const profile = await Profile.findOneAndUpdate(
      { userId: author }, 
      { $push: { posts: savedPost._id } }, 
      { new: true } 
    );

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId); 

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; 

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You are not allowed to delete this post' });
    }


    await Post.findByIdAndDelete(postId);

    await Profile.updateOne(
      { posts: postId },
      { $pull: { posts: postId } }
    );

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}