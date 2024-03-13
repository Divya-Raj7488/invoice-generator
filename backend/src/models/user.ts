// name, email, password

import mongoose,{Schema, model} from "mongoose";

interface User extends Document{
    name: string,
    email: string,
    password: string
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel
