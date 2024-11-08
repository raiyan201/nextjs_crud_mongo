'use client'
import { useRouter } from "next/navigation";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";

const RemoveBtn = ({id}) => {
const router = useRouter();

const removeTopic=async()=>{
    const confirmed = confirm("Are you sure you want to Delete?");
    if(confirmed){
        const res=await fetch(`http://localhost:3000/api/topics?id=${id}`,
            {method:"DELETE"},
        )
        if(res.ok){
            alert("deleted")
            router.refresh();
        }
    }
}

  return (
        <button onClick={removeTopic} className="text-red-500"> <HiOutlineTrash size={24} />
        </button>    
  )
}

export default RemoveBtn

