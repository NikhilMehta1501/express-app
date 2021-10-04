import Mongoose from "mongoose";
import slugify from "slugify";

const UserSchema = new Mongoose.Schema({
  slug:{
    type: String,
    unique: true,
    required: true
  },
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

UserSchema.pre('validate', function(next){
  if(this.displayName){
    this.slug = slugify(this.displayName, {
      lower: true,
      strict: true
    })
  }
  console.log(this)
  next()
})

export default Mongoose.model('User',UserSchema)