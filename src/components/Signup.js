'use client';

import Link from "next/link";
import Input from "./Input"
import { useState } from "react";
import axios from 'axios'
import {useRouter} from 'next/navigation'



const defaultData={name:"",username:"",password:""};



const Register=()=>{

    const [data,setData]=useState(defaultData);
    const router=useRouter()
    
    const onValueChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const onRegister = async (e)=>{
        e.preventDefault();
        if(!data.name || !data.username || !data.password){
            alert("please fill all the fields")
            return
        }
            //Api
            try{
              const response= await axios.post('api/signup',data)
              console.log('response',response)
              setData(defaultData)
              if(response.status==200){
                router.push('login')
              }
              else{
                console.log('bad response')
              }

            }
            catch(error){
                console.log(error)
            }
    }

    return(

        <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 mb-4">

            <h1 className="text-3xl mb-4 text-center">Register</h1>

            <form>
              <Input label="Name" type="text" id="name" value={data.name} 
              
              onChange={(e)=>{
                onValueChange(e)
              }}
              />
              <Input label="Username" type="text" id="username"value={data.username} onChange={(e)=>{
                onValueChange(e)
              }}/>
              <Input label="Password" type="password" id="password" value={data.password} onChange={(e)=>{
                onValueChange(e)
              }}/>

                <button
                onClick={(e)=>{
                    onRegister(e)
                }}
                    className="bg-blue-600 text-white py-2 px-2 rounded-full w-full"
                >
                    Submit
                </button>
                <p className="mt-4">Already have an account?{""}

                    <Link href="/login" className="text-blue-600 hover:underline"> Login</Link>
                </p>
            </form>

    
        </div>
        </div>
    )
}

export default Register;

