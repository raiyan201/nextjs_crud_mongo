

import Link from "next/link"
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { DELETE } from "../app/api/topics/route";
import RemoveBtn from "./RemoveBtn";
import UpdateBtn from "./UpdateBtn"

const getTopics = async () =>{
    try {
        const res= await fetch("http://localhost:3000/api/topics",{cache:"no-store"})
        console.log('res',res)
        if(!res.ok){
            throw new Error("failed to fetchd data");        
        }
        // console.log(res.json())    
        return res.json();
    }     
    catch (error) {
     console.log(err)   
    }
}






export const Dashboard = async () => {
    
    const {topics}=await getTopics()

    
    return (
        <>

            {topics.map((t)=>(
    
    
    <div className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{t.title}</h2> 
                    <div>{t.description}</div> 
                </div>

                <div className="flex gap-2">
                <UpdateBtn id={t._id}/>
                < RemoveBtn id={t._id}/>
                    {/* <button onClick={'removeTopic'} className="text-red-500"> <HiOutlineTrash size={24} />
                    </button> */}
                </div>
      </div>
      
    ))}
    </>

    )
  }
  