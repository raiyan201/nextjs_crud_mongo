import Link from "next/link"
import Profile from "./Profile";

export const Navbar = () => {
  return (
    <nav className="flex justify-between justify-items-start bg-slate-900 px-8  py-5">
        <Link className="text-white" href={"/dashboard"}>CRUD</Link>
        <Link className="bg-white p-3 ml-4"  href={"/addTopic"}>Add Topic</Link>
        <Profile/>
    </nav>
  )
}
