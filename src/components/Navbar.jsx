import Link from "next/link";
import Profile from "./Profile";
import { useContext } from "react";
import UserContext from "src/app/context/userContext";

export const Navbar = () => {
  const { user, isLoading } = useContext(UserContext);

  console.log("context_in_navbar:", user);

  if (isLoading) {
    // Show a loading state while fetching user
    return (
      <nav className="flex justify-between justify-items-start bg-slate-900 px-8 py-5">
        <p className="text-white">Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between justify-items-start bg-slate-900 px-8 py-5">
      <Link className="text-white" href={"/dashboard"}>
        {user ? <p>Welcome, {user.name}</p> : <p></p>}
      </Link>
      <Link className="bg-white p-3 ml-4" href={"/addTopic"}>
        Add Topic
      </Link>
      <Link className="bg-white p-3 ml-4" href={"/history"}>
        History
      </Link>
      
      <Profile />
    </nav>
  );
};
