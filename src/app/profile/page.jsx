'use client';

import Link from "next/link";
import { useState } from "react";

const defaultData={username:"",password:""};
import axios from 'axios'
import { useRouter } from "next/navigation";

const Profile=()=>{

    const [data,setData]=useState(defaultData);
    const onValueChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const router=useRouter()

    const onProfile=async (e)=>{
        //alert("ASd")
        e.preventDefault();

        const response=await axios.get('api/logout')


        if(response.status==200){
            router.push('/login')
        }
        
        //Api
    }

    return(

        <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 mb-4">

            <h1 className="text-3xl mb-4 text-center">Profile</h1>

           <p>Welcome To Profile Page</p>

              
                <button
                onClick={(e)=>{
                    onProfile(e)
                }}
                    className="bg-red-600 text-white py-2 px-2 rounded-full w-full"
                 >
                    Logout
                </button>

        </div>
        </div>
    )
}

export default Profile;

