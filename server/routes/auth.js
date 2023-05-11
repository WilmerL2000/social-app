import express from 'express';
import { login } from '../controllers/auth.js';

/* `const router = express.Router();` is creating a new instance of an Express router. This router can
be used to define routes for handling HTTP requests. */
const router = express.Router();

router.post('/login', login);

export default router;
