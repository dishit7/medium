import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks/useBlogs"
import { useParams } from "react-router-dom"
import { BlogSkeleton } from "./BlogSkeleton"
export const Blog = ()=>{
    const {id }=useParams()
    const {loading,blog} =useBlog({
        id:id || " "
    })

    console.log(id)
    if(loading){
        return(<>
              <div><BlogSkeleton /></div>
              </>)
    }
    return (
        <>
         <FullBlog blog={blog} />
        </>
    )
}