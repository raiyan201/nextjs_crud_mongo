
"use client"
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react"

import { FaTrashRestoreAlt } from "react-icons/fa";
import RestoreBtn from "./RestoreBtn";
import Link from "next/link";

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
  


  const restoreAllTopic=async()=>{
    const confirmed=confirm('Are you sure you want to Restore All Topics')
  if(confirmed){
    const res=await fetch(`http://localhost:3000/api/trash`,{method:"PATCH",
    body:JSON.stringify({action:"RestoreAll"}),
      headers:{"Content-Type":"application/json"},}
  )
    if(res.ok){
      alert("Restored All Successfully")
      getTrash()
    }
  }
  }


  const DeleteAllTopic=async()=>{
    const confirmed=confirm('Are you sure you want to Delete All Topics')
  if(confirmed){
    const res=await fetch(`http://localhost:3000/api/trash`,{method:"PATCH",
      body:JSON.stringify({action:"DeleteAll"}),
      headers:{"Content-Type":"application/json"},}
    )
    if(res.ok){
      alert("Deleted All Successfully")
      getTrash()
    }
  }
  }



  return (
    

  <>

  {trash.length > 0 ?(

       <div className="flex justify-end">
                      {/* ({trash.length}) */}

        <button type="button" className="bg-slate-950 my-2 mr-1 p-3 text-white"onClick={restoreAllTopic} title="Restore All">Restore</button>
        <button type="button" className="bg-slate-950 my-2 mr-1 p-3 text-white"onClick={DeleteAllTopic} title="Delete All">Delete</button>
        </div>
      ):""}


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
