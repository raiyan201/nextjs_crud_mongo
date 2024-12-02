// import { connect } from "http2";
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
    await connectDB()
    try{
        const{id}=params
        const topic=await Topic.findOne({_id:id})
        return NextResponse.json({topic},{status:200})
    }
    catch(err){
        console.log(err)
    }
}


export async function PATCH(request,{params}){
    await connectDB()
    const{id}=params
    const {action}=await request.json()
    console.log('action',action)
    if(action=="softDelete"){
        await Topic.findByIdAndUpdate(id,{delete_status:true})
        return NextResponse.json({msg:"Soft Deletion Successfull"})
    }
    if(action=="Restore"){
        await Topic.findByIdAndUpdate(id,{delete_status:false})
        return NextResponse.json({msg:"Restore Successfull"})
    }

}
