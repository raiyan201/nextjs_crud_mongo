'use client'

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AiTwotoneDelete } from "react-icons/ai";


const SoftDeleteBtn = ({id,refresh}) => {
const router = useRouter();

    const removeTopic=async()=>{
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        console.log('API Base URL:', apiBaseUrl);
    
        const confirmed=confirm("Are you sure you want to Delete");
        try {
            if(confirmed){
                const res=await fetch(`${apiBaseUrl}/api/topics/${id}`,{
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

