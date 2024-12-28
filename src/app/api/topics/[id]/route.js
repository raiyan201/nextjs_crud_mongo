// import { connect } from "http2";
import { Topic,History } from "../../../../Models/userModels";
import connectDB from "../../../../db/config";
import { NextResponse } from "next/server";



export async function PUT(request,{params}){
    await connectDB()
    const {id}=params
    const{newTitle:title,newDescription:description} =await request.json();
    await Topic.findByIdAndUpdate(id,{title,description})
    await History.create({title,description,action:"Updated"})
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
    const topic = await Topic.findById(id);
    console.log('topic..:', topic);
    
    if(action=="softDelete"){
        console.log('soft delete id',id)

        await Topic.findByIdAndUpdate(id,{delete_status:true})
        
        await History.create({title: topic.title,
            description: topic.description,
            action:"Soft Deleted"})

        return NextResponse.json({msg:"Soft Deletion Successfull"})
    }
    if(action=="Restore"){

        await Topic.findByIdAndUpdate(id,{delete_status:false})
        await History.create({title: topic.title,
            description: topic.description,
            action:"Restored"})
        return NextResponse.json({msg:"Restore Successfull"})
    }
}
