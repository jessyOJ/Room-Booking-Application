import mongoose from'mongoose'
import Joi from 'joi'
import bcrypt from 'bcryptjs'
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required: true
    }
},{
    timestamps:true
})

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password:Joi.string().required()
    })
    return schema.validate(user)
    }
    userSchema.methods.toJSON = function(){
        const user = this
        const userObject = user.toObject()
    delete userObject.password
    return userObject
    }
    userSchema.statics.findByCredentials = async(email,password)=>{
        const user =await  User.findOne({email})
        if(!user)
            throw new Error('Incorrect Email or Password,Please try again!...')
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
            throw new Error('Incorrect Email or Password, Please try again!...')
        return user
    }
   
    userSchema.pre('save',async function(next){
        const user= this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }
        next()
    })
   
    const User = mongoose.model('users',userSchema)
    export default User;
    export {validateUser}