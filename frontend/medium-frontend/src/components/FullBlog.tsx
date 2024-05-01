import { Blog } from "../hooks/useBlogs"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:Blog})=>{
    const size="big"
     console.log(blog)
    return (<>
        
           <Appbar />
            
            <div className=" grid grid-cols-12">
                <div className=" col-span-8   ">
                    <div className="flex flex-col justify-center items-center" >
                    <div className="font-extrabold text-5xl">{blog.tilte}</div>
                    <div className="text-slate-500 pt-2">2nd Dec 2023</div>
                    <div className="pt-4">{blog.content}</div>
                </div>
                </div>
                <div className="col-span-4   ">
                    <span className="text-2xl">Author</span> 
         
                <div className="flex">
                  
                <div>
       
                <div className=" text-2xl font-bold"> {blog.author}</div>
                <div className="pt-2 text-slate-500  t">Random catchphrase to grab authors attention</div>
                 </div>
                
                 </div>
              
                </div>
            </div>
    
          </>)
 
}
export const Avatar2 = ({author }:{author:string, })=>{
     
     return (
        <>
<div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full  h-10 w-10" >        
   <span className="font-medium text-gray-600 ">{author[0].toUpperCase()+author[1].toUpperCase() }</span>
          </div>
        </>
    )
}