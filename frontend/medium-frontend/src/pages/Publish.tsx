import { useState } from "react"
import { Appbar } from "../components/Appbar"
import axios from "axios"


const Payload ={
  //  Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExQGdtYWlsLmNvbSJ9.o59TsOkxVVnOsUsAhrkjiSQpfOufYuMajzEqhbgD6qU"
  Authorization:localStorage.getItem('jwt')
   }
   console.log(Payload)
export const Publish =()=>{
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    
    async  function publishBlog  (){
     const response = await axios.post("http://localhost:8787/blog",{
        title:title,
        content:content
     },{headers:Payload}) 
     alert(response.data)
     }
    return (
    <>
    <Appbar  />
    <div>
         <div className="flex flex-col items-center ">
         <input  placeholder="title" className=" w-6/12 mt-5 border-2 border-slate-400 h-9" 
         
         onChange={(e)=>{
            setTitle(e.target.value)
        }}/> 
         <textarea  
                    onChange={(e)=>{
                        setContent(e.target.value)
                    }}
                    placeholder="Content"
                    className="w-6/12 border-2 resize-y h-64"
                />         
                
                
                
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3" onClick={publishBlog}>Publish Blog</button> 
                </div>


                      
            
    </div>

    </>
    )
    }