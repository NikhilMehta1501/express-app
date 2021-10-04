import Post from "../models/Post.js"
import User from "../models/User.js"

export async function getAllPosts(req, res) { 
  try {
    const allPosts = await Post.find({ user: req.user.id })
                              .populate('user')
                              .sort({createdAt:'desc'})
                              .lean()
    // console.log(allPosts);
    let loggedUser = req.user.toJSON()
    res.render('dashboard', {
      user: req.user.toJSON(),
      allPosts,
      loggedUser
    }) 
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
} 

export async function newPost(req, res) {
  try {
    req.body.user = req.user.toJSON()
    await Post.create(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
}

export async function viewPostPage(req, res){
  try {
    let post = await Post.findOne({slug: req.params.slug})
                          .populate('user')
                          .lean()
    if(!post) res.redirect('/error/404');
    let loggedUser = req.user.toJSON()
    res.render('post/viewPost', {post, loggedUser})
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
}

export async function editPost(req, res){
  try {
    let post = await Post.findOne({slug: req.params.slug}).lean()

    if(!post) res.render('error/404')

    if(post.user._id.toString() != req.user._id.toString()) res.redirect('/post')
    else {
      post = await Post.findOneAndUpdate({slug: req.params.slug}, req.body, {
        new: true,
        runValidators: true
      })
      res.redirect(`/post/view/${post.slug}`)
    }

  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
}

export async function deletePost(req, res){
  try {
    let post = await Post.findOne({slug: req.params.slug}).lean()

    if(!post) res.render('error/404')

    if(post.user._id.toString() != req.user._id.toString()) res.redirect('/post')
    else {
      post = await Post.remove({slug: req.params.slug})
      res.redirect('/dashboard')
    }
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
}

export async function editPostPage(req, res){
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    
    if(!post) res.render('error/404');
    
    (post.user._id.toString() == req.user._id.toString()) ? res.render('post/editPost', { post }) : res.redirect('/post')
    
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
}

export async function getPublicPosts(req, res){
  try {
    const posts = await Post.find({status: 'public'})
                                  .populate('user')
                                  .sort({createdAt:'desc'})
                                  .lean()
    let isUserStories = false; 
    let loggedUser = req.user.toJSON()
    res.render('post/publicPosts',{ posts, isUserStories, loggedUser})
  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
}

export async function userPostPage(req, res){
  try {
    let loggedUser = req.user.toJSON()
    let userToFind = await User.findOne({slug: req.params._id}).lean()
    let posts = await Post.find({
                        user : req.params._id,
                        status : 'public'
                      })
                      .populate('user')
                      .lean()
    
    let isUserStories = true;
    res.render('post/publicPosts', { posts,
                                    isUserStories,
                                    loggedUser,
                                    userToFindName: userToFind.firstName
                                  })

  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
}