"use client";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react"

const page = () => {

  const[history,setHistory]=useState([]);

  const fetchdata =async ()=>{ 
      
  try{
    const res=await fetch("http://localhost:3000/api/history",{cache:"no-store"})
    // console.log('result_history',res)
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    const data=await res.json()
    console.log('history',data)
    console.log('result_history',data.history)
    setHistory(data.history)
  }
  
  catch(err){
    console.log(err)
  }

  
}
  
// fetchdata()

useEffect(()=>{
    try{
      fetchdata()
    }
    catch(err){
      console.log(err)
    }
  },[])


const columns = [
  // { field: "sNo", headerName: "S.No", flex: 0.5, renderCell: (params) => params.api.getRowIndex(params.row) + 1 } ,

  { field: "_id", headerName: "ID", flex: 1  },
  { field: "title", headerName: "Title", flex: 1  },
  { field: "description", headerName: "Description", flex: 1  },
  { field: "action", headerName: "Action Performed", flex: 1  },
  { field: "date_time", headerName: "Created At", flex: 1  },
];

return (
    <div>
  <h1 className="text-center text-white bg-red-950 px-5 py-3" style={{ fontSize: '24px', marginTop:'5px' }}>History</h1>

    <DataGrid
    rows={history}
    columns={columns}
    pageSize={5}
    getRowId={(row)=>row._id}
    rowsPerPageOptions={[5, 10, 20,50]}
    pagination

    // initialState={{
    //   pagination: {
    //     paginationModel: { pageSize: 50, page: 0 }, // Default page size of 50
    //   },
    // }}
    initialState={{
      pagination:{
        paginationModel:{pageSize:50,page:0}
      }
    }}

    />

    </div>
  )
}

export default page
