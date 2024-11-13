
import Link from "next/link"
import Profile from "./Profile";
import { useContext } from "react";
import UserContext from "../app/context/userContext";

export const Navbar = () => {
  
  const context=useContext(UserContext)
  console.log('context_in_navbar',context.user)


  return (
    <nav className="flex justify-between justify-items-start bg-slate-900 px-8  py-5">

        <Link className="text-white" href={"/dashboard"}> {context.user ?  (<p>Welcome, {context.user.name}</p>):("") }</Link>
        <Link className="bg-white p-3 ml-4"  href={"/addTopic"}>Add Topic</Link>
        <Profile/>
    </nav>
  )
}
