export function ensureAuth(req, res, next) {
  (req.isAuthenticated()) ? next() : res.redirect('/')
}

export function ensureGuest(req, res, next) {
  (req.isAuthenticated()) ? res.redirect('/post') : next()
}
