import { NextResponse } from "next/server";
import  jwt from "jsonwebtoken"; 

export function GET(request){
    const authToken=request.cookies.get("jwt_token")?.value;
    console.log('authToken',authToken)
    const data=jwt.verify(authToken,'shhwwhs')
    console.log('data',data)
    
    return NextResponse.json({data})

}
