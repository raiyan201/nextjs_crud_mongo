import {NextResponse} from "next/server"
import bcrypt from 'bcrypt'
import  jwt from "jsonwebtok                                            en"; 
import connectDB from "../../../db/config";
import User from "../../../Models/userModels";

export async function POST(req){
    
    connectDB()

    try{

    const body=await req.json();
    const{username,password}=body
    if( !username || !password){
        return NextResponse.json({"msg":"Invalid Credentials"},{"status":400})
    }
    
    const isUserPresent=await User.findOne({username});
    
    if(isUserPresent){
        const isMatch = await bcrypt.compare(password,isUserPresent.password)
    }

    if(!isUserPresent){
        return NextResponse.json({"msg":"login not successfull"},{"status":400})
    }

    const name=isUserPresent.name
    const jwt_token=jwt.sign({name,username},'shhwwhs');
    const response=NextResponse.json({"msg":"token created for login ","status":201})
    response.cookies.set("jwt_token",jwt_token)

    return response
}

    catch(err){
        return NextResponse.json({msg:err},{status:500})
        console.log(err)
    }
}