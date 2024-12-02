
"use client"
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react"

import { FaTrashRestoreAlt } from "react-icons/fa";
import RestoreBtn from "./RestoreBtn";

const Trash = () => {
  const[trash,setTrash]=useState([])


  const getTrash=async()=>{
    try {
      const res=await fetch("http://localhost:3000/api/trash",{cache:"no-store"})
      console.log('result_trash',res)
      if(!res.ok){
        throw new Error("failed to fetchd data");        
      }
      const data=await res.json()
      console.log('data',data)
      console.log('Trash received:', data.trash);
      setTrash(data.trash)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTrash()
  },[])
  


  return (
    
      <>

    {trash.map((t)=>(

<div key={t._id}  className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
           <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
        <div>{t.description}</div>
</div>

<div className="flex gap-2">
  <RestoreBtn id={t._id} refresh={getTrash}/>

<RemoveBtn id={t._id} refresh={getTrash}/>
</div>

</div>

      ))}    
    </>
  )
}

export default Trash
