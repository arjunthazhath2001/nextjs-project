import {connect} from '@/dbconfig/dbconfig';
import User from "@/models/userModel"
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';



connect()
//now we gonna handle a post request coz during signup, the server is getting the user data and we are posting it onto the database.

 export async function POST(request: NextRequest) {
    try{

        const reqBody = await request.json()
        //from the request that comes from frontend wait till u get request content in json format and assign that json object to reqBody
        const {username, email, password} = reqBody;

        // the entire request json object info is with reqBody. so now lets extract 3 info from thereqbody json file

        console.log(reqBody);
        // we will remove console.log in production coz its not safe

        //now  time to check whether user already exists in the USER table. Inside our userModel.js we have created a users table and assigned that object to a variable called User. So using that variable u can check whether some kind of data already exists inside that table.
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status: 400})
        }
        //lets assume user is successfully created. Now lets store his password in the db. But before storing sensitive info like this u need to hash it using bcrypt.js

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)

        //we created a row with the info that it gotta contain
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        //now lets save this row to the database
        const savedUser = await newUser.save()

        //now lets console log this so that we get to see whats going on but will remove this during production
        console.log(savedUser);

        //now since everything is done lets return a success response

        return NextResponse.json({
            message: "User created successfully",
            sucess: true,
            savedUser
        })

        //once the user is signed up we need to push him to the login page. for that logic go and check the signup/page.tsx


    } catch (error: any){
        return NextResponse.json({error: error.message},{status:500})
    }
    
}