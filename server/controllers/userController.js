const {User}=require('../model/userModel');
const bcrypt=require('bcrypt');


module.exports.register=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
    const usernameChk=await User.findOne({username});
    if(usernameChk){
        return res.status(200).json({
            message:"User already exist",
            status:false
        })
    }
    const emailChk=await User.findOne({email});
    if(emailChk){
        return res.status(200).json({
            message:"Email already exist",
            status:false
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    });
    delete user.password;
    return res.status(200).json({
        status:true,
        user
    })
    }
    catch(ex){
        next(ex)
    }
};


module.exports.login=async(req,res,next)=>{
    try{
        const {username,password}=req.body;
    const user=await User.findOne({username});
    if(!user){
        return res.status(200).json({
            message:"Incorrect username & password.",
            status:false
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){
        return res.status(200).json({
            message:"Incorrect username & password.",
            status:false
        })
    }
    delete user.password;
    return res.status(200).json({
        status:true,
        user
    })
    }
    catch(ex){
        next(ex)
    }
};  



module.exports.getAllUsers=async(req,res,next)=>{
    try{
        const users=await User.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username",
            "_id"
        ]);
        return res.json(users);
    }catch(ex){
        next(ex);
    }
}