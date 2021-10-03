import Mongoose from "mongoose";
import slugify from "slugify";

const UserSchema = new Mongoose.Schema({
  // slug:{
  //   type: String,
  //   required: true,
  //   unique: true
  // },
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

// UserSchema.pre('validate', (next)=>{
//   if(this.displayName){
//     this.slug = slugify(this.displayName, {
//       lower: true,
//       strict: true
//     })
//   }
//   next()
// })

export default Mongoose.model('User',UserSchema)