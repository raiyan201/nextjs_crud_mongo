import { NextResponse } from "next/server"
import connectDB from "../../../db/config";
import { Topic,History } from "../../../Models/userModels";


export async function GET(request){
    try{
        await connectDB()
        const history=await History.find()
        return NextResponse.json({history})
    }
    catch(err){
        console.log(err)
    }
}