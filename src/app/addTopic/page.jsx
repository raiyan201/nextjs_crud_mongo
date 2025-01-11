'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
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
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      console.log('API Base URL:', apiBaseUrl);

      const res= await fetch(`${apiBaseUrl}/api/topics`,{
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

export default Page