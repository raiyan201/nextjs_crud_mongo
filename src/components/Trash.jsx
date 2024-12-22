
"use client"
import RemoveBtn from "./RemoveBtn";
import { useEffect, useState } from "react"

import { FaTrashRestoreAlt } from "react-icons/fa";
import RestoreBtn from "./RestoreBtn";
import Link from "next/link";
import $ from 'jquery';

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
    
    const ischecked = $('#selectAllCheckbox').is(":checked") || $('.checkboxes').is(":checked");    if(ischecked) {
      const confirmed=confirm('Are you sure you want to Restore All Topics')
      if(confirmed){
        
        let id_restore=[]
        
        /*document.querySelectorAll('.checkboxes').forEach((checkbox)=>{
          if(checkbox.checked){
            id_restore.push(checkbox.id)
          }
        })
*/


      $('.checkboxes:checked').each(function(){
        id_restore.push(this.id)
      })
        console.log('id_restore',id_restore)

        const res=await fetch(`http://localhost:3000/api/trash`,{method:"PATCH",
        body:JSON.stringify({action:"RestoreAll",id_restore:id_restore}),
          headers:{"Content-Type":"application/json"},}
      )
        if(res.ok){
          alert("Restored All Successfully")
          getTrash()
        }
      }
    } 
    else{
      alert("Please select the options") 
    }
  }


  const DeleteAllTopic=async()=>{
    const ischecked = $('#selectAllCheckbox').is(":checked") || $('.checkboxes').is(":checked");    
    
    if(ischecked) {
    
    
  const confirmed=confirm('Are you sure you want to Delete All Topics')
  if(confirmed){
    
    let id_delete=[]
    $('.checkboxes:checked').each(function(){
      id_delete.push(this.id)
    })
    console.log('id_delete',id_delete)

    const res=await fetch(`http://localhost:3000/api/trash`,{method:"PATCH",
      body:JSON.stringify({action:"DeleteAll",id_delete:id_delete}),
      headers:{"Content-Type":"application/json"},}
    )
    if(res.ok){
      alert("Deleted All Successfully")
      getTrash()
    }
  }
}
else{
  alert("please select the fields")
}
  }

  const handleselectAll=(event)=>{
    const ischecked=event.target.checked;
    document.querySelectorAll('.checkboxes').forEach((checkbox)=>{
      checkbox.checked=ischecked;
    })


  }



  return (
    

  <>

  {trash.length > 0 ?(
    <>
       <div className="flex justify-end">

        <button type="button" className="bg-slate-950 my-2 mr-1 p-3 text-white"onClick={restoreAllTopic} title="Restore All">Restore All</button>
        <button type="button" className="bg-slate-950 my-2 mr-1 p-3 text-white"onClick={DeleteAllTopic} title="Delete All">Delete All</button>
        </div>
        

        <div className="flex justify-end">    
      <label htmlFor="" className="mr-2">Select All </label> 
     <input type="checkbox" id="selectAllCheckbox" className="flex justify-end" onChange={handleselectAll} /> 
     </div> 
     </>
      ):  ""
     }



    {trash.map((t)=>(

<div key={t._id}  className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
           <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
        <div>{t.description}</div>
</div>

<div className="flex gap-2">

<input type="checkbox" className="checkboxes" id={t._id}/>

  <RestoreBtn id={t._id} refresh={getTrash}/>

<RemoveBtn id={t._id} refresh={getTrash}/>

</div>

</div>

      ))}    
    </>
  )
}

export default Trash
