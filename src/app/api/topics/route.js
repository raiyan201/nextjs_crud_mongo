import { NextResponse } from "next/server";
import connectDB from "../../../db/config";
import { Topic,History } from "../../../Models/userModels";
import { NextURL } from "next/dist/server/web/next-url";


export async function POST(req){
    try{
        await  connectDB()
        const body=await req.json();
        const{title,description}=body
        await Topic.create({title,description})
        await History.create({title,description,action:"Created"})
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
        const topics=await Topic.find({"delete_status":false})
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
        const topic = await Topic.findById(id);
        console.log('topic__:', topic);
        
        await Topic.findByIdAndDelete(id)
        await History.create({
            title: topic.title,
            description: topic.description,
            action: "Deleted",
        });
        return NextResponse.json({msg:"Topic Deleted"},{status:"200"})
    }
    catch(err){
        console.log(err)
    }
}


export async function PATCH(request){
    try {
        
        await connectDB()
        const {id_delete}=await request.json()
        
        console.log('id_delete:',id_delete)
 
        

        

        const result=await Topic.updateMany({_id:id_delete},{delete_status:true})
        
        if(id_delete){
            
            for(let i=0;i<id_delete.length;i++){
                const topic= await Topic.findById(id_delete[i])
                console.log('topic_soft_deleteall:', topic);
        
            await History.create({
                title: topic.title,
                description: topic.description,
                action: "Soft Deleted",
            });
        }
        }
        
        return NextResponse.json({msg:"Topics Deleted"},{status:"200"})
    } 
    catch (error) {
        console.log(error)
    }

    //const {action}=await request.json()
    //console.log('action',action)

}