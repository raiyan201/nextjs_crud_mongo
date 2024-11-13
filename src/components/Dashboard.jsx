"use client";

import RemoveBtn from "./RemoveBtn";
import UpdateBtn from "./UpdateBtn"
import SoftDeleteBtn from "./SoftDeleteBtn"
import { useContext, useEffect, useState } from "react";
import UserContext from "../app/context/userContext";

export const Dashboard =  () => {    

    const[topics,setTopics]=useState([])
    const [error, setError] = useState(null);

    const context=useContext(UserContext)
    console.log('context_in_dashboard',context.user)


    useEffect(()=>{
        try {
        console.log('useEffect is running'); 
        const getTopics = async () =>{
            try {
                const res= await fetch("http://localhost:3000/api/topics",{cache:"no-store"})
                console.log('res',res)
                if(!res.ok){
                    throw new Error("failed to fetchd data");        
                }
                const data=await res.json() 
                console.log('data:', data);
                console.log('Topics received:', data.topics);
                setTopics(data.topics)
            }     
            catch (err) {
             console.log(err)   
             setError(err.message)
            }
        }
        getTopics(); 
    }
        catch (error) {
            console.log('Error in useEffect:', error);
          }
    },[])
    
   
    
    return (
        <>
            {topics.map((t)=>(
    
    <div key={t._id} className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{t.title}</h2> 
                    <div>{t.description}</div> 
                </div>

                <div className="flex gap-2">
                <UpdateBtn id={t._id}/>

{context.user.admin_status?( < RemoveBtn id={t._id}/>):(< SoftDeleteBtn   id={t._id}/>)}

                </div>
      </div>
      
    ))}
    </>
    
    )
  }
  