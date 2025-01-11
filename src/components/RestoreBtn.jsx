

import { LiaTrashRestoreSolid } from "react-icons/lia";

const RestoreBtn = ({id,refresh}) => {


    const restoreTopic=async()=>{
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      console.log('API Base URL:', apiBaseUrl);
    
        const confirmed=confirm("Are you sure you want to Restore")

        try {
            if(confirmed){
                const res=await fetch(`${apiBaseUrl}/api/topics/${id}`,{
                    method:"PATCH",
                    body:JSON.stringify({action:"Restore"}),
                    headers:{"Content-Type":"application/json"}
                })
                if(res.ok){
                    alert("Restored")
                    refresh();
                }
                }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <LiaTrashRestoreSolid  onClick={restoreTopic} style={{ fontSize: '24px', color: 'blue' }} title="Restore this Item" />
    </div>
  )
}

export default RestoreBtn
