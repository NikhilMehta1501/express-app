import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
  googleId:{
    type: String,
    required: true
  },
  displayName:{
    type: String,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  image:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

export default Mongoose.model('User',UserSchema)