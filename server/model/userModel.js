//Mongoose
const mongoose =  require("mongoose");
const { Schema } = mongoose;


//Models 1
//User Schema

const userSchema = new Schema({
 
  active: {
    type: Boolean,
    default:true,
    required: true,
    min: 15,
    max: 50
  },  
  username: {
      type: String,
      required: true,
      min: 15,
      max: 50
    },
    email: {
      type: String,
      required: true,
      min: 5,
      max: 255,
      unique:true
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 1024
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
  });
  const User = mongoose.model("users", userSchema);

  module.exports={User:User}