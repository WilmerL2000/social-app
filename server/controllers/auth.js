import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * This function registers a new user by hashing their password and saving their data to a database.
 * @param req - The `req` parameter is an object representing the HTTP request made to the server. It
 * contains information such as the request method, headers, URL, and any data sent in the request
 * body.
 * @param res - `res` is the response object that will be sent back to the client making the request.
 * It contains methods for setting the HTTP status code, headers, and sending the response body. In
 * this code, `res` is used to send a JSON response with the saved user object or an error message
 */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lasName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    /* This code is generating a salt using `bcrypt.genSalt()` and then using that salt to hash the user's
password using `bcrypt.hash()`. Salting and hashing passwords is a common security practice to
protect user passwords in case of a data breach. The salt is a random string that is added to the
password before hashing, making it more difficult for attackers to crack the password using
precomputed hash tables or rainbow tables. The resulting hash is then stored in the database instead
of the plain text password. */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    /* This code is creating a new instance of the `User` model with the provided user data. The `User`
model likely represents a user in a database. The `password` property is set to the hashed password generated using
`bcrypt.hash()`. */
    const newUser = new User({
      firstName,
      lasName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    });

    /* `const savedUser = await newUser.save();` is saving the newly created user instance `newUser` to
    the database and returning the saved user object. */
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function logs in a user by comparing their provided email and password with the hashed password
 * stored in the database, generates a JSON Web Token for the authenticated user, and returns the token
 * and user information.
 * @param req - req is the request object that contains information about the incoming HTTP request,
 * such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is sent back to the client by the server. It contains
 * information such as the status code, headers, and data that is being sent back in response to the
 * client's request. In this case, the response object is being used to send a JSON object containing
 * @returns If the user does not exist, a response with a status code of 400 and a message "User does
 * not exist." is returned. If the password provided by the user does not match the hashed password
 * stored in the database, a response with a status code of 400 and a message "Invalid credentials." is
 * returned. If the authentication is successful, a JSON Web Token (JWT) and the
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) return res.status(400).json({ msg: 'User does not exist.' });

    /* is comparing the plain text password provided by the user during login 
    with the hashed password stored in the database for the corresponding user.*/
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

    /* `const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);` is generating a JSON Web
    Token (JWT) for the authenticated user. The `jwt.sign()` method takes two arguments: a payload
    object containing the user's ID, and a secret key used to sign the token. The resulting token
    can be used to authenticate the user in subsequent requests to the server. */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
