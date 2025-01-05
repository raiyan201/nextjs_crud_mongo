'use client';

import Link from "next/link";
import { useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import axios from 'axios'

const defaultData={username:"",password:""};

const Login=()=>{
    const router=useRouter();
    const [data,setData]=useState(defaultData);
    const onValueChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const onLogin=async(e)=>{
        //alert("ASd")
        e.preventDefault();

        if(!data.username || !data.password){
            alert("please fill all the fields")
            return
        }

            //Api
            try{
                const response=await axios.post('api/login',data)
                console.log('response',response)
                setData(defaultData)
                if(response.status==200){
                    router.push('/dashboard')
                }
            }catch(err){
                console.log(err)
            }

    }




    return(

        <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 mb-4">

            <h1 className="text-3xl mb-4 text-center">Login</h1>

            <form>
           
              <Input label="Username" type="text" id="username"value={data.username} onChange={(e)=>{
                onValueChange(e)
              }}/>
              <Input label="Password" type="password" id="password" value={data.password} onChange={(e)=>{
                onValueChange(e)
              }}/>
                <button
                onClick={(e)=>{
                    onLogin(e)
                }}
                    className="bg-blue-600 text-white py-2 px-2 rounded-full w-full"
                >
                    Submit
                </button>
                <p className="mt-4">{`Don't have an account?`}{""}
                    <Link href="/signup" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </form>

    
        </div>
        </div>
    )
}

export default Login;

