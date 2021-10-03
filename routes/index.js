import {Router} from 'express';
import { ensureAuth, ensureGuest } from '../middleware/auth.js'
const router = Router()

import { getAllPosts } from '../controllers/postController.js'

// Login/Sign Up
// GET /
router.get('/', ensureGuest, (req, res) => res.render('login', { layout : 'login' }) );

// Dashboard
// GET /dashboard
router.get('/dashboard', ensureAuth, getAllPosts);

// 404
// GET /404
router.get('/404', (req, res) => res.render('error/404'));

// 500
// GET /500
router.get('/500', (req, res) => res.render('error/500'));

export default router