import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    //the structure of the table
    username:{
        type: String,
        required: [true, "Please provide username"],
        unique:true,
    },
    email:{
        type: String,
        required: [true, "Please provide email"],
        unique:true,
    },
    password:{
        type: String,
        required: [true, "Please provide password"],
    },
    isVerified:{
        type: boolean,
        default: false,
        //if user is not verified, i ll send him email, he has to click on verification link, post that his isverfied info will turn into true
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

//its like saying---"hey mongoose, inside models folder thats there in the mongoDB check whether we have a table called "users" or else , hey mongoose create a model(table) ---let its name be "users" and let it follow the structure that have i have assigned to the variable "userSchema"

export default User;
