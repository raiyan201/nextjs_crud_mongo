import { NextResponse } from "next/server";
import connectDB from "../../../db/config";
import { Topic,History } from "../../../Models/userModels";


export async function GET(){
    try {
        await connectDB()
        const trash=await Topic.find({"delete_status":true})
        console.log('trash',trash)
        return NextResponse.json({trash})
    } catch (error) {
        console.log(error)
    }
}


export async function PATCH(request,{params}){
    try {

        await connectDB()
        const {action,id_restore,id_delete}=await request.json()
        console.log('action',action)
        
        console.log('id_restore:',id_restore)
        console.log('id_delete:',id_delete)
        

        if(id_restore){

        for(let i=0;i<id_restore.length;i++){
            const topic = await Topic.findById(id_restore[i]);
            console.log('topic..:', topic);    
            
            if(action=='RestoreAll'){
            
                const result=await Topic.updateMany({_id:id_restore},{delete_status:false})
                
                await History.create({title: topic.title,
                    description: topic.description,
                    action:"Restored"})
            }
        }
    }
        

        
    if(action=='DeleteAll'){

    if(id_delete){

        for(let i=0;i<id_delete.length;i++){
            const topic = await Topic.findById(id_delete[i]);
            console.log('topic..to_delete_permanently:', topic);    
            
                await History.create({title: topic.title,
                    description: topic.description,
                    action:"Permanently Deleted"})
                }
                const result=await Topic.deleteMany({_id:id_delete},{delete_status:true})
                
        }
    }
        

        return NextResponse.json({msg:"Topics Restore"},{status:"200"})

    } 
    catch (error) {
        console.log(error)
    }
}