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





  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newTitle || !newDescription){
      alert("title and description should not be blank")
      return
    }
  }
 
  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Description' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}/>
        <button className='bg-green-500 text-white py-3 px-5 w-fit' type="submit">Update Topics</button>
    </form>  
    
  )
}

export default EditForm