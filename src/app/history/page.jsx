"use client";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react"
import * as XLSX from "xlsx";

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
    // setHistory(data.history)
    const sortedHistory=data.history.sort((a,b)=>new Date(b.date_time)-new Date(a.date_time))
    console.log('sortedHistory:',sortedHistory)
    setHistory(sortedHistory)         
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

const exportToExcel=()=>{
  const worksheet=XLSX.utils.json_to_sheet(history)
  const workbook=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook,worksheet,"history")
  XLSX.writeFile(workbook,"history.xlsx")
}


return (
    <div>
  <div className="text-center text-white bg-red-950 px-5 py-3" style={{ fontSize: '24px', marginTop:'5px' }} >History <span style={{ fontSize: '15px', float: 'right',}} className="bg-lime-800 p-3 "><button onClick={exportToExcel}> Export</button></span></div>

    <DataGrid
    rows={history}
    columns={columns}
    pageSize={5}
    getRowId={(row)=>row._id}
    rowsPerPageOptions={[5, 10, 20,50]}
    pagination

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
