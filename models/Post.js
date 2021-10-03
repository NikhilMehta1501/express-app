import Mongoose from "mongoose";

const PostSchema = new Mongoose.Schema({
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

export default Mongoose.model('Post', PostSchema)