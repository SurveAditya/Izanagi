import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
{
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default: false,
    },
},
    {
        timestamps: true,
    }
   
)

//we can use this.password here because we are calling this method
//on user so we can access the password through this method
// we are checking if the entered password matches the user that is found
userSchema.methods.matchPassword = async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function (next) {
    //because we have also implemented the update feauture
    //so we need to check if it is for updated password
    //we only want to do this if the password field is set
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })

const User = mongoose.model('User',userSchema)

export default User