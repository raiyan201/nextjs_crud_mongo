import React from 'react'

const EditForm = () => {
  return (
    <form className="flex flex-col gap-3">
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Title'/>
        <input className='border border-slate-500 px-8 py-4' type="text" name="" id="" placeholder='Topic Description'/>

        <button className='bg-green-500 text-white py-3 px-5 w-fit' type="submit">Update Topics</button>

    </form>  )
}

export default EditForm