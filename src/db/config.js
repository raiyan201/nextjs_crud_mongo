import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://substring:CKVVLBDKM8WhRw8P@cluster0.vwgjyoy.mongodb.net/")
        console.log("connect")
    }
    catch(err){
        console.log(err)
    }
}  

export default connectDB;