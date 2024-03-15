import Post from "../model/Postmodel.js";
import User from "../model/user.model.js";


export const createPost = async (req, res) => {
	try {
		const { postedBy, text } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}


		const newPost = new Post({ postedBy, text, username:user.username });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};


export const likeUnlikePost = async (req, res) => {
	try {
		const { id: postId } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPost = post.likes.includes(userId);

		if (userLikedPost) {
			// Unlike post
			await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
			res.status(200).json({ state:false,message: "Post unliked successfully" });
		} else {
			// Like post
			post.likes.push(userId);
			await post.save();
			res.status(200).json({ state:true,message: "Post liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const  getUserPosts =  async (req, res)=>{
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
export const  getAllPosts =  async (req, res)=>{
	try {
		const posts = await Post.find().sort({ createdAt: -1 });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const  updatePost =  async (req, res)=>{
	try {
		const {text} = req.body;
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to update post" });
		}
		await Post.findByIdAndUpdate(req.params.id,{text});

		res.status(200).json({ message: "Post updated successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export const  deletePost =  async (req, res)=>{
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}
		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export const  commentToPosts =  async (req, res)=>{
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const reply = { userId, text, username };

		post.replies.push(reply);
		await post.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

