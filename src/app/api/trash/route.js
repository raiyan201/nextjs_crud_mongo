import { NextResponse } from "next/server";
import connectDB from "../../../db/config";
import { Topic } from "../../../Models/userModels";


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

        if(action=='RestoreAll'){
        const result=await Topic.updateMany({_id:id_restore},{delete_status:false})
        }

        if(action=='DeleteAll'){
            const result=await Topic.deleteMany({_id:id_delete},{delete_status:true})
        }

        
        return NextResponse.json({msg:"Topics Restore"},{status:"200"})

    } 
    catch (error) {
        console.log(error)
    }
}