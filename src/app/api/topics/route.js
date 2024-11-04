import { NextResponse } from "next/server";
import connectDB from "../../../db/config";
import { Topic } from "../../../Models/userModels";
import { NextURL } from "next/dist/server/web/next-url";


export async function POST(req){
    connectDB()
    try{
        const body=await req.json();
        const{title,description}=body
        await Topic.create({title,description})
        console.log("created successfuly")
        return NextResponse.json({msg:"Topics Created Successfully"},{status:201})
    }
    catch(err){
        console.log(err)
    }
}


export async function GET(){
    try{
        await connectDB()
        // const body=await req.json();
        const topics=await Topic.find()
        return NextResponse.json({topics})
    }
    catch(err)
    {
        console.log(err)
    }
}



export async function DELETE(request){
    try{
        await connectDB()
        const id=request.nextUrl.searchParams.get("id")
        await Topic.findByIdAndDelete(id)
        return NextResponse.json({msg:"Topic Deleted"},{status:"200"})
    }
    catch(err){
        console.log(err)
    }
}