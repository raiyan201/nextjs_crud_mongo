"use client";

import RemoveBtn from "./RemoveBtn";
import UpdateBtn from "./UpdateBtn"
import SoftDeleteBtn from "./SoftDeleteBtn"
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Input from "./Input";
import $ from 'jquery';
import UserContext from "../app/context/userContext";


export const Dashboard =  () => {    

    const[topics,setTopics]=useState([])
    const [error, setError] = useState(null);
    const[isselectAll,setIsselectAll]=useState(false);

    const {user,isLoading}=useContext(UserContext)
    console.log('context_in_dashboard',user)



    const getTopics = async () =>{
      try {
        
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiBaseUrl}/api/topics`, { cache: 'no-store' });      
        console.log('res',res)
          if(!res.ok){
              throw new Error("failed to fetchd data");        
          }
          const data=await res.json() 
          console.log('data:', data);
          console.log('Topics received dash:', data.topics);
          const sortedTopics=data.topics.sort((a,b)=>new Date(b.date_time)-new Date(a.date_time))
          console.log('sortedTopics:',sortedTopics)
          // setTopics(data.topics)
          setTopics(sortedTopics)
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
      
      const res=await fetch(`http://localhost:3000/api/topics`,{method:"PATCH", body:JSON.stringify({action:"DeleteAll",id_delete:id_delete}),
      headers:{"Content-Type":"application/json"},}
      )
      if(res.ok){
        alert("Deleted All Successfully")
        getTopics()
        // refresh()
      }
  
    }
    }
    else{
      alert("please select the fields")
    }
  }

    const handleselectAll = (event) => {
    const ischecked=event.target.checked;
    setIsselectAll(ischecked);

    document.querySelectorAll('.checkboxes').forEach((checkbox)=>{
      checkbox.checked=ischecked;
    })
    };
    

    return (
        <>
        
        {topics.length>0?(
          <>
          <div className="flex justify-end">

        <button type="button" className="bg-slate-950 my-2 mr-1 p-3 text-white"onClick={DeleteAllTopic} title="Delete All">Delete All</button>
       
        <Link className="bg-slate-950 my-2 p-3 text-white " href={"/trash"}>Trash</Link>
       
        </div>


<div className="flex justify-end">
<label htmlFor="" className="mr-2">Select All </label> 
   <input type="checkbox" id="selectAllCheckbox"  onChange={handleselectAll} /> 
</div>

</>


        ): 
        <div className="flex justify-end">    
           <Link className="bg-slate-950 my-2 p-3 text-white " href={"/trash"}>Trash</Link>
           
           </div>}

           
            {topics.map((t)=>(
    <div key={t._id} className="p-4 border border-slate-300 my-4 flex justify-between gap-5 items-start">
                <div>
                    <h2 className="font-bold text-2xl">{t.title}</h2> 
                    <div>{t.description}</div> 
                </div>
                <div className="flex gap-2">

                <input type="checkbox" className="checkboxes" id={t._id}/> 

                <UpdateBtn id={t._id}/>
                {/* {user ?( < RemoveBtn id={t._id}/>):(< SoftDeleteBtn   id={t._id}/>)} */}
                {user ?(< SoftDeleteBtn   id={t._id} refresh={getTopics}/>):(< RemoveBtn id={t._id}/>)}
                </div>
      </div>
          
    ))}
    

    </>
    
    )
  }
  