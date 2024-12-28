'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router=useRouter()
  const[title,setTitle]=useState('')
  const[description,setDescription]=useState('')

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(!title || !description){
      alert("title and description should not be blank")
      return
    }

    try {
      const res= await fetch('http://localhost:3000/api/topics',{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({title,description,}),
      });

      if(res.ok){
        
        router.push('/dashboard')
        router.refresh();
      }
      
    } catch (error) {
      console.log(error)
    }
  }



  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Description'  value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <button className='bg-green-500 text-white py-3 px-5 w-fit' type="submit">Add Topics</button>
    </form> 

  )
}

export default page