import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// ~ Configuration ~

/* These lines of code are used to get the current directory path of the file being executed. */
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
/* `dotenv.config();` is loading environment variables from a `.env` file into the Node.js process.
This allows sensitive information such as API keys, database credentials, and other configuration
options to be stored outside of the codebase and accessed through the `process.env` object. The
`.env` file should be kept secret and not committed to version control. */
dotenv.config();
const app = express();
/* `app.use(express.json())` is setting up the middleware to parse incoming JSON data. It allows the
application to receive JSON data in HTTP requests and automatically parse it into a JavaScript
object that can be used in the application. This middleware is commonly used in Express applications
to handle JSON data sent in HTTP requests. */
app.use(express.json());
/* `app.use(helmet());` is setting the Cross-Origin Resource Policy (CORP) for the application using
the `helmet` middleware. The `helmet` middleware is a collection of security-related middleware
functions for Express applications. The `helmet()` function sets various HTTP headers to improve the
security of the application, including the Cross-Origin Resource Policy (CORP) header. The
`crossOriginResourcePolicy` method is used to set the policy for cross-origin resource sharing. In
this case, the policy is set to 'cross-origin', which means that resources can be shared with any
origin. This helps to prevent cross-site scripting (XSS) attacks by restricting the resources that
can be accessed by other domains. */
app.use(helmet());
/* is setting the Cross-Origin
Resource Policy (CORP) for the application using the `helmet` middleware. The
`crossOriginResourcePolicy` method is used to set the policy for cross-origin resource sharing. In
this case, the policy is set to 'cross-origin', which means that resources can be shared with any
origin. This helps to prevent cross-site scripting (XSS) attacks by restricting the resources that
can be accessed by other domains. */
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
/* `app.use(morgan('common'));` is setting up the Morgan middleware to log HTTP requests to the console
in the "common" format. The "common" format includes the remote IP address, the HTTP method, the
URL, the HTTP version, the status code, the response size, and the referrer. This can be useful for
debugging and monitoring the application's HTTP traffic. */
app.use(morgan('common'));
/* `app.use(bodyParser.json({ limit: '30mb', extended: true }));` is setting up the bodyParser
middleware to parse incoming JSON data. The `limit` option sets the maximum size of the JSON payload
to 30 megabytes, and the `extended` option allows for parsing of nested objects. This middleware is
commonly used in Express applications to handle JSON data sent in HTTP requests. */
app.use(bodyParser.json({ limit: '30mb', extended: true }));
/* `app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));` is setting up the bodyParser
middleware to parse incoming URL-encoded data. */
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
/* `app.use(cors());` is setting up the CORS (Cross-Origin Resource Sharing) middleware for the Express
application. This middleware allows the application to receive requests from other domains or
origins. By default, web browsers restrict cross-origin HTTP requests initiated from scripts, so the
CORS middleware is necessary to enable cross-origin requests. The `cors()` function sets up the
middleware with default options, which allows requests from any origin and with any headers. */
app.use(cors());
/* `app.use('/assets', express.static(path.join(__dirname, 'public/assets')));` is setting up a static
file server for the application. It is telling Express to serve any files in the `public/assets`
directory when a request is made to the `/assets` endpoint. This allows the application to serve
static assets such as images, stylesheets, and JavaScript files to the client. The
`path.join(__dirname, 'public/assets')` function is used to construct the absolute path to the
`public/assets` directory, regardless of the operating system. */
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ~ File Storage ~

/* This code is setting up a storage engine for the Multer middleware, which is used for handling file
uploads in the Express application. The `diskStorage` function is used to create a new storage
engine that saves files to disk. The `destination` function specifies the directory where uploaded
files will be stored, and the `filename` function specifies the name of the uploaded file. In this
case, the uploaded file will be saved in the `public/assets` directory with its original name. */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

/* `const upload = multer({ storage });` is setting up a middleware function for handling file uploads
in the Express application. The `multer` middleware is used to handle `multipart/form-data`
requests, which are commonly used for file uploads. The `storage` object specifies the storage
engine to be used for saving uploaded files to disk. The `upload` constant is a reference to the
middleware function that can be used to handle file uploads in the application. */
const upload = multer({ storage });

// ~ MONGOOSE SETUP ~

const PORT = process.env.PORT || 6001;
/* This code is setting up a connection to a MongoDB database using the Mongoose library. The
`mongoose.connect()` method is used to connect to the database using the URL specified in the
`process.env.MONGO_URL` environment variable. The options object passed to the `connect()` method
specifies that the new URL parser and unified topology should be used. Once the connection is
established, the `app.listen()` method is called to start the Express application and listen for
incoming requests on the specified `PORT`. */

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(err));
