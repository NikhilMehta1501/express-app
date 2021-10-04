import {Router} from 'express';
import { ensureAuth } from '../middleware/auth.js'
const router = Router()

import { editPostPage, viewPostPage, newPost, editPost, deletePost, getPublicPosts, userPostPage } from '../controllers/postController.js'

// New post
// GET /post/new
router.get('/new', ensureAuth, (req, res) => res.render('post/newPost') );

// View post
// GET /post/view/slug
router.get('/view/:slug', ensureAuth, viewPostPage );

// Show edit post page
// GET /post/edit/slug
router.get('/edit/:slug', ensureAuth, editPostPage );

// Public Posts page
// Get /post
router.get('/', ensureAuth, getPublicPosts);

// Show user posts page
// GET /post/user/id
router.get('/user/:id', ensureAuth, userPostPage );

// New post form processing
// POST /post
router.post('/', ensureAuth, newPost);

// Edit post form processing
// POST /post/slug
router.put('/:slug', ensureAuth, editPost);

// Delete post form processing
// DELETE /post/slug
router.delete('/:slug', ensureAuth, deletePost);

export default router