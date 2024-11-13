import {NextResponse} from "next/server"
import bcrypt from 'bcrypt'
import  jwt from "jsonwebtoken"; 
import connectDB from "../../../db/config";
import User from "../../../Models/userModels";

export async function GET(req){
    
    await  connectDB()
    

    try{
        const response=NextResponse.json({"msg":"logout successfull","status":200})
        response.cookies.set("jwt_token","",{httpOnly:true,expires: new Date(0)});
        return response;
}

    catch(err){
        return NextResponse.json({msg:err},{status:500})
        console.log(err)
    }
}
