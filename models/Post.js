import Mongoose from "mongoose";
import slugify from "slugify";

const PostSchema = new Mongoose.Schema({
  slug:{
    type: String,
    required: true,
    unique: true
  },
  title:{
    type: String,
    required: true,
    trim: true
  },
  body:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: 'public',
    enum: ['public','private']
  },
  user:{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

PostSchema.pre('validate', function(next){
  if(this.title){
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    })
  }
  next()
})

export default Mongoose.model('Post', PostSchema)