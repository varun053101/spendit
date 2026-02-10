const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Hash before saving to the database
userSchema.pre('save', async function(){
    const user = this;

    // Hash the password only if it has been modified or its new record
    if(!user.isModified('password'))   return;
    try{
        //Generate hash password(salting)
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Override the plain password with the hashed one
        user.password = hashedPassword;
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(userPassword){
    try {
        // use bcrypt.compare() to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch(err) {
        throw err;
    }
}

module.exports = mongoose.model("User", userSchema);