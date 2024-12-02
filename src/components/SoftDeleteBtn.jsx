'use client'

import { useRouter } from "next/navigation";
import { useContext } from "react";
import UserContext from "../app/context/userContext";
import { AiTwotoneDelete } from "react-icons/ai";

const SoftDeleteBtn = ({id,refresh}) => {
const router = useRouter();

    const removeTopic=async()=>{
        const confirmed=confirm("Are you sure you want to Delete");
        try {
            if(confirmed){
                const res=await fetch(`http://localhost:3000/api/topics/${id}`,{
                    method:"PATCH",
                    body:JSON.stringify({action:"softDelete"}),
                    headers:{"Content-Type":"application/json"}
                })                
                if(res.ok){
                    alert("Deleted")
                    refresh();

                }
            }
        } 
        
        catch (error) {
            console.log(error)
        }
    }


  return (
        <button title="Delete this item" onClick={removeTopic} className="text-red-500"> <AiTwotoneDelete size={24} />
        </button>    
  )
}

export default SoftDeleteBtn

