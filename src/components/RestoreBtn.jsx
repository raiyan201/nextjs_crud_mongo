

import { LiaTrashRestoreSolid } from "react-icons/lia";

const RestoreBtn = ({id,refresh}) => {


    const restoreTopic=async()=>{
        const confirmed=confirm("Are you sure you want to Restore")

        try {
            if(confirmed){
                const res=await fetch(`http://localhost:3000/api/topics/${id}`,{
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
