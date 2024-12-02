"use client";

import RemoveBtn from "./RemoveBtn";
import UpdateBtn from "./UpdateBtn"
import SoftDeleteBtn from "./SoftDeleteBtn"
import { useContext, useEffect, useState } from "react";
import UserContext from "../app/context/userContext";
import Link from "next/link";

export const Dashboard =  () => {    

    const[topics,setTopics]=useState([])
    const [error, setError] = useState(null);

    const {user,isLoading}=useContext(UserContext)
    console.log('context_in_dashboard',user)



    const getTopics = async () =>{
      try {
          const res= await fetch("http://localhost:3000/api/topics",{cache:"no-store"})
          console.log('res',res)
          if(!res.ok){
              throw new Error("failed to fetchd data");        
          }
          const data=await res.json() 
          console.log('data:', data);
          console.log('Topics received dash:', data.topics);
          setTopics(data.topics)
      }     
      catch (err) {
       console.log(err)   
       setError(err.message)
      }
  }
  
    useEffect(()=>{
        try {
        console.log('useEffect is running'); 
       
        getTopics(); 
    }
        catch (error) {
            console.log('Error in useEffect:', error);
          }
    },[])
    
    if (isLoading) {
      return (
        <nav className="flex justify-between justify-items-start bg-slate-900 px-8 py-5">
          <p className="text-white">Loading...</p>
        </nav>
      );
    }
  
    
    return (
        <>
        
        <div className="flex justify-end">
        <Link className="bg-slate-950 my-2 p-3 text-white " href={"/trash"}>Trash</Link>
        </div>

            {topics.map((t)=>(
    <div key={t._id} className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{t.title}</h2> 
                    <div>{t.description}</div> 
                </div>
                <div className="flex gap-2">
                <UpdateBtn id={t._id}/>
                {/* {user ?( < RemoveBtn id={t._id}/>):(< SoftDeleteBtn   id={t._id}/>)} */}
                {user ?(< SoftDeleteBtn   id={t._id} refresh={getTopics}/>):(< RemoveBtn id={t._id}/>)}
                </div>
      </div>
          
    ))}
    

    </>
    
    )
  }
  