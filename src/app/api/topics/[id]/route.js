import { connect } from "http2";
import { Topic } from "../../../../Models/userModels";
import connectDB from "../../../../db/config";
import { NextResponse } from "next/server";



export async function PUT(request,{params}){
    await connectDB()
    const {id}=params
    const{newTitle:title,newDescription:description} =await request.json();
    await Topic.findByIdAndUpdate(id,{title,description})
    return NextResponse.json({msg:"Topic Updated"},{status:200})
}

export async function GET(request,{params}){
    connectDB()
    try{
        const{id}=params
        const topic=await Topic.findOne({_id:id})
        return NextResponse.json({topic},{status:200})
    }
    catch(err){
        console.log(err)
    }
}
