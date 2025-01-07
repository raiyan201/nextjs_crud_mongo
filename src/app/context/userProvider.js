'use client'

import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import {currentUser} from '../services/userServices'

const UserProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const[isLoading, setisLoading]=useState(true)

    useEffect(()=>{    
    async function load(){
        try {
            const currentUsers =  await currentUser()
            console.log('currentUsers',currentUsers)
            console.log('currentUsers_Data',currentUsers.data)
            setUser(currentUsers.data); 

        } catch (error) {
            console.log(error)
            setUser(null)
        }
        finally{
            setisLoading(false)
        }
    } 
        load()
    },[])    
    
return (<UserContext.Provider value={{user,setUser,isLoading}}>{children}</UserContext.Provider>
)
}

export default UserProvider
