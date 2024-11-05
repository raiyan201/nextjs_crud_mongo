import {NextResponse} from "next/server"
import bcrypt from 'bcrypt'
import  jwt from "jsonwebtoken"; 
import connectDB from "../../../db/config";
import User from "../../../Models/userModels";

export async function POST(req){
    connectDB()

    const body=await req.json();
    const{name,username,password}=body
    if(!name|| !username || !password){
        return NextResponse.json({"msg":"Invalid Credentials"},{"status":400})
    }
    const isUserPresent=await User.findOne({username});
    if(isUserPresent){
        return NextResponse.json({"msg":"Already Exist"},{"status":400})
    }
    const hashpassword=await bcrypt.hash(password,10)
    
    try{
        const user=new User({name,username,password:hashpassword})
        await user.save()
        const jwt_token=jwt.sign({name,username},'shhhs');
        const response=NextResponse.json({"msg":"token created","status":201})
        response.cookies.set("jwt_token",jwt_token)
        return response
    }

    catch(err){
        return NextResponse.json({msg:err},{status:500})
        console.log(err)
    }
    // return NextResponse.json({"msg":"ok"})
}