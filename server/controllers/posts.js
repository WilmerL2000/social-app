import Post from '../models/Post.js';
import User from '../models/User.js';

/**
 * This function creates a new post with user information and saves it to the database.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` to set the HTTP status code, `json` to send a JSON
 * response, and `send` to send a plain text response.
 */
export const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  const user = await User.findById(userId);

  const newPost = new Post({
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    description,
    userPicturePath: user.picturePath,
    picturePath,
    likes: {},
    comments: [],
  });

  await newPost.save();

  const post = await Post.find();

  res.status(201).json(post);

  try {
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * The function is an asynchronous function that retrieves a feed post.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request method, headers, URL, and any data sent in the request body. It is
 * used to retrieve data from the client-side and pass it to the server-side for processing.
 * @param res - The "res" parameter in the function signature refers to the response object that will
 * be sent back to the client making the request. It is used to send the HTTP response back to the
 * client with the data or error message.
 */
export const getFeedPost = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * This function retrieves posts made by a specific user.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request parameters, headers, body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It is an instance of the `http.ServerResponse` class in Node.js. The `res` object
 * has methods like `res.status()` and `res.json()` that are used to
 */
export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;

    const post = await Post.find({ userId });

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * This function allows a user to like or unlike a post and updates the post's likes accordingly.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request method, headers, URL, and any data that was sent in the
 * request body.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` to set the HTTP status code, `json` to send a JSON
 * response, and many others.
 */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
