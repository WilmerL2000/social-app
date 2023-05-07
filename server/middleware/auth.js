import jwt from 'jsonwebtoken';

/**
 * This function verifies a JWT token in the Authorization header and sets the verified user in the
 * request object.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `status` to set the HTTP status code of the response,
 * `json` to send a JSON response, and `send` to send a plain text response.
 * @param next - next is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move to the next middleware function when the current middleware
 * function has completed its task.
 */
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) res.status(403).json('Access denied.');

    if (token.startWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
