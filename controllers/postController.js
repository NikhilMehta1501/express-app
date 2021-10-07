import Post from "../models/Post.js"
import User from "../models/User.js"
import moment from "moment"

export async function getAllPosts(req, res) { 
  try {
    const allPosts = await Post.find({ user: req.user.id })
                              .populate('user')
                              .sort({createdAt:'desc'})
                              .lean()
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
    let { page, size } = req.query

    page = (!page) ? 1 : parseInt(page)
    size = (!size) ? 10 : parseInt(size)

    const skip = (page-1)*size

    const totalPosts = await Post.countDocuments({status: 'public'})
    let totalPages = Math.ceil(totalPosts/size)
    // totalPages = (totalPages<1) ? 1 : totalPages

    const posts = await Post.find({status: 'public'})
                                  .populate('user')
                                  .sort({createdAt:'desc'})
                                  .skip(skip)
                                  .limit(size)
                                  .lean()

    const lastPostCreatedAt = posts[posts.length-1].createdAt
    const isLastPage = !(await Post.exists({status: 'public', createdAt: {$lt: lastPostCreatedAt} }))
    const url=`/post`

    let isUserStories = false; 
    let loggedUser = req.user.toJSON()
    res.render('post/publicPosts',{ posts,
                                    isUserStories,
                                    loggedUser,
                                    page,
                                    size,
                                    totalPages,
                                    isLastPage,
                                    url
                                  })
  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
}

export async function userPostPage(req, res){
  try {
    let loggedUser = req.user.toJSON()

    let { page, size } = req.query

    page = (!page) ? 1 : parseInt(page)
    size = (!size) ? 10 : parseInt(size)

    const skip = (page-1)*size

    const totalPosts = await Post.countDocuments({ user : req.params.id, status: 'public'})
    let totalPages = Math.ceil(totalPosts/size)
    console.log(totalPosts);
    console.log(Math.ceil(totalPosts/size));

    let userToFind = await User.findOne({id: req.params.id}).lean()
    let posts = await Post.find({
                        user : req.params.id,
                        status : 'public'
                      })
                      .populate('user')
                      .sort({createdAt:'desc'})
                      .skip(skip)
                      .limit(size)
                      .lean()
                      .lean()

    const lastPostCreatedAt = posts[posts.length-1].createdAt
    const isLastPage = !(await Post.exists({user: req.params.id, status: 'public', createdAt: {$lt: lastPostCreatedAt} }))
    const url=`/post/user/${req.params.id}`
    
    let isUserStories = true;
    res.render('post/publicPosts',{ posts,
                                    isUserStories,
                                    userToFindName: userToFind.firstName,
                                    loggedUser,
                                    page,
                                    size,
                                    totalPages,
                                    isLastPage,
                                    url
                                  })

  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
}