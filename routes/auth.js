import {Router} from 'express';
import passport from 'passport';
const router = Router()

// Auth with google
// GET auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth Callback
// GET auth/google/callback
router.get('/google/callback',
            passport.authenticate('google', { failureRedirect: '/' }), 
            (req, res) => res.redirect('/dashboard') 
          );

// logout
// GET auth/logout
router.get('/logout', (req, res) => { 
  req.logout()
  res.redirect('/') 
});

export default router