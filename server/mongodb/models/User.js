import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//modifying before saving in db : hashing
userSchema.pre("save", async function (next) {
  console.log(this);
  if (!this.isModified("password")) return next(); //as hashing is expensive , so we need to check if the user has not modified the password , then there is no need for re-hashing the same password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
