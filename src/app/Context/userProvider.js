'use client'
// import { httpAxios } from "@/helper/httpHelper";

import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import {currentUser} from '../services/userServices'

const userProvider = ({children}) => {
    const [user,setUser]=useState(null)
    // const result=

    useEffect(()=>{    
    async function load(){
        try {
            const currentUsers =  await currentUser()
            console.log('currentUsers',currentUsers)
            // setUser({...currentUsers})
            setUser(currentUsers.data); // Only set the user data you need

        } catch (error) {
            console.log(error)
            setUser(null)
        }
    } 
        load()
    },[])    
    
return (<UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
)
}
export default userProvider
