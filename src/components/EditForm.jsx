'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";


const EditForm = ({id,title,description}) => {
  // const {ids}=id

  console.log("EditForm ID:", id); 
  console.log("title:", title); 
  console.log("description:", description); 

  const router=useRouter()

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);





  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!newTitle || !newDescription){
      alert("title and description should not be blank")
      return
    }

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      console.log('API Base URL:', apiBaseUrl);

      const res= await fetch(`${apiBaseUrl}/api/topics/${id}`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({newTitle,newDescription}),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

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
        <input className='border border-slate-500 px-8 py-4' type="text"  placeholder='Topic Title' onChange={(e)=>setNewTitle(e.target.value)}  value={newTitle}/>
        <input className='border border-slate-500 px-8 py-4' type="text"  placeholder='Topic Description'  onChange={(e)=>setNewDescription(e.target.value)} value={newDescription}/>
        <button  className='bg-green-500 text-white py-3 px-5 w-fit'>Update Topics</button>
    </form>  
    
  )
}

export default EditForm