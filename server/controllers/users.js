import { formatFriends } from '../utils/formatFriends.js';
import User from '../models/User.js';

/**
 * This is an asynchronous function that retrieves a user by their ID and returns it as a JSON object
 * in the response.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request parameters, headers, and body. It is passed as the first
 * parameter to the getUser function.
 * @param res - `res` is the response object that is used to send the response back to the client. It
 * is an instance of the `http.ServerResponse` class in Node.js. In this code snippet, `res` is used to
 * send a JSON response with the user data or an error message with a
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * This function retrieves and formats the friends of a user based on their ID.
 * @param req - The `req` parameter is an object representing the HTTP request made to the server. It
 * contains information such as the request method, headers, URL, and any data sent in the request
 * body.
 * @param res - `res` is the response object that will be sent back to the client with the requested
 * data or error message. It is an object that has methods to set the HTTP status code and send the
 * response body. In this case, the `res` object is used to send a JSON response with the
 */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    /* `const friends = await Promise.all(user.friends.map((id) => User.findById(id)));` is retrieving all
the friends of a user by mapping over the `user.friends` array and calling the `User.findById()`
method for each friend's ID. The `Promise.all()` method is used to wait for all the promises
returned by `User.findById()` to resolve before returning the `friends` array. */
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = formatFriends(friends);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * This is an asynchronous function that adds or removes a friend from a user's friend list and returns
 * the updated list of formatted friends.
 * @param req - The request object, which contains information about the incoming HTTP request such as
 * headers, parameters, and body.
 * @param res - `res` is the response object that will be sent back to the client with the result of
 * the API call. It contains methods to set the HTTP status code, headers, and body of the response. In
 * this case, the response will be a JSON object containing the formatted list of friends.
 */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = formatFriends(friends);

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
