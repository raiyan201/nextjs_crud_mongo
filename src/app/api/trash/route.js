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