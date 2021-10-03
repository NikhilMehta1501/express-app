import {Router} from 'express';
import { ensureAuth } from '../middleware/auth.js'
const router = Router()

import { editPostPage, viewPostPage, newPost, editPost, deletePost, getPublicPosts, userPostPage } from '../controllers/postController.js'

// New post
// GET /post/new
router.get('/new', ensureAuth, (req, res) => res.render('post/newPost') );

// View post
// GET /post/view/id
router.get('/view/:id', ensureAuth, viewPostPage );

// Show edit post page
// GET /post/edit/id
router.get('/edit/:id', ensureAuth, editPostPage );

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
// POST /post/id
router.put('/:id', ensureAuth, editPost);

// Delete post form processing
// DELETE /post/id
router.delete('/:id', ensureAuth, deletePost);

export default router