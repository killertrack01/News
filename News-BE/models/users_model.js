const mongoose  = require('mongoose');
const validator = require("validator");
const bcrypt    = require("bcryptjs");
const jwt       = require("jsonwebtoken");

// Create User Schema:
const SchemaUser = mongoose.Schema({
   username: {
      type: String,
      require: true,
      trim: true,
      unique: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: value => {
         if (!validator.isEmail(value)){
            throw new Error({error: "Invalid Email address"});
         }
      }
   },
   password: {
      type: String,
      require: true,
      minLength: 7
   },
   phone: {
      type: String,
      unique: true
   },
   address: {
      type: String
   },
   status: {
      type: Boolean,
      default: false
   },
   tokens: [
       {
          token: {
            type: String,
             require: true
          }
       }
   ],
   create_at: {
      type: Date,
      default: Date.now()
   },
   updated_at: Date
});

// Hàm làm 1 cái gì đó trước khi lưu 1 object
SchemaUser.pre("save", async function (next){
   // Hash the password before saving the user model
   const user = this;
   if (user.isModified("password")){
      user.password = await  bcrypt.hash(user.password, 8);
   }
   next();
});

// Hàm tự generate ra 1 chuỗi Token
SchemaUser.methods.generateAuthToken = async function(){
   // Generate an auth token for the user
   const user = this;
   const token = jwt.sign({_id: user._id}, "mk");
   user.tokens = user.tokens.concat({token});
   await user.save();
   return token;
};

// Hàm find username & password so trùng password đã mã hóa
SchemaUser.statics.findByCredentials = async (username, password) => {
   // Search for a user by email and password.
   const user = await UserModel.findOne({username});
   if (!user){
      throw new Error({error: "Invalid login credentials" });
   }

   const isPasswordMatch = await bcrypt.compare(password, user.password);
   if (!isPasswordMatch){
      throw new Error({error: "Invalid login credentials"});
   }
   return user;
};


const UserModel = mongoose.model('users', SchemaUser);
module.exports = UserModel