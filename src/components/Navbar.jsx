import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-900 px-8  py-5">
        <Link className="text-white" href={"/"}>CRUD</Link>
        <Link className="bg-white p-3"  href={"/addTopic"}>Add Topic</Link>
    </nav>
  )
}
