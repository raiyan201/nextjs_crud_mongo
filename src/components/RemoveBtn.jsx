'use client'

import { useRouter } from "next/navigation";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import Trash from "./Trash";

const RemoveBtn = ({id,refresh}) => {
const router = useRouter();

const removeTopic=async()=>{
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    console.log('API Base URL:', apiBaseUrl);
    const confirmed = confirm("Are you sure you want to Delete?");
    if(confirmed){
        const res=await fetch(`${apiBaseUrl}/api/topics?id=${id}`,
            {method:"DELETE"},
        )
        if(res.ok){
            alert("Permanent Deleted")
            refresh();            
        }
    }
}

  return (
        <button title="Delete this item" onClick={removeTopic} className="text-red-500"> <HiOutlineTrash size={24} />
        </button>    
  )
}

export default RemoveBtn

