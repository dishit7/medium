import { useEffect ,useState } from "react";
import axios from "axios"
   interface Blogs {
    id: number,
            "tilte": string,
            "content": string,
            "published": boolean,
            "author_name":  string
   }

export interface Blog {
        id: number,
                "tilte": string,
                "content": string,
                "published": boolean,
                "author":  string
       
}
   const Payload ={
    Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExQGdtYWlsLmNvbSJ9.o59TsOkxVVnOsUsAhrkjiSQpfOufYuMajzEqhbgD6qU"
   }
   export const useBlog = ({id}:{id:String})=>{
   const [loading,setLoading] =useState(true) 
   const [blog,setBlog] =useState<Blog>({
    id: 0,
    tilte: "",
    content: "",
    published: false,
    author: "",
  })


   useEffect(()=>{
    axios.get(`http://localhost:8787/blog/${id}`,{headers:Payload}).then(response=>setBlog(response.data))
    setLoading(false)
  },[])
    
  return{ loading,
    blog}
   }

  export const useBlogs = ()=>{
    const [loading,setLoading] =useState(true)
    const [blogs,setBlogs]=useState <Blogs[]>([])
 

   useEffect(()=>{
     axios.get(`http://localhost:8787/blogs`,{headers:Payload}).then(response=>setBlogs(response.data.blogs))
     setLoading(false)
   },[])

   return{ loading,
   blogs}

}