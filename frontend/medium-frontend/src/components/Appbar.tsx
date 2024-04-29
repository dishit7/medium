import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar =()=>{
    return (<>
    
    <div className=" flex justify-between px-10 py-4 border-b">
        <Link to="/blogs">
        <div  className=" text-lg font-bold inline">Medium</div>
        </Link>
        <div className="flex items-center">
            <Link to="publish">
      <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
      </Link>
<div className="  justify-end items-start mb-4 "><Avatar author="user" /></div>
 </div></div>
    </>)
}
