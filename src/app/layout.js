"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { usePathname } from "next/navigation";
import UserProvider from "./context/userProvider";
import { useContext } from "react";
import UserContext from "./context/userContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {

  const pathname=usePathname()

  const  nonavbarRoutes=['/login','/signup']

  
  // const context=useContext(UserContext)
  // console.log('context_in_layout',context.user)
  console.log(process.cwd());

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
  <div className="max-w-1xl mx-auto p-4">        

        {/* {!(nonavbarRoutes).includes(pathname) && <Navbar/>}         */}
        {/* <Navbar/> */}
        
        <div className="mt-8">
        <UserProvider>
        {/* <Navbar/> */}
                {!(nonavbarRoutes).includes(pathname) && <Navbar/>}        


        {/* {context.user && (<Navbar/>)} */}
        
        {children}
        </UserProvider>

  </div>
</div>
      </body>
    </html>
  );
}
