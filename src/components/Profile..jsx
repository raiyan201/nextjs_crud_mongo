'use client';

import Link from "next/link";
import Input from "./Input"
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";


const Profile=()=>{

    

    //Api

    return(

        <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 mb-4">

            <h1 className="text-3xl mb-4 text-center">Profile</h1>

            <form>

                <button
                onClick={(e)=>{
                    onLogout(e)
                }}
                    className="bg-blue-600 text-white py-2 px-2 rounded-full w-full"
                >
                    Submit
                </button>
            </form>
        </div>
        </div>
    )
}

export default Profile;

