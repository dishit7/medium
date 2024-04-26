import {Link,useNavigate} from "react-router-dom"
import {signupInput} from "@dishit7/medium-common"
import { useState } from "react"
import { LabelledInput } from "./Input"
import axios from "axios"
import {BACKEND_URL} from "../../config"
//inside your starter code, do this
 
  
 

export const Auth = ({type} :{type:"signup" |"signin"}) =>{
    const navigate= useNavigate()
    const [postInputs ,setpostInputs] =useState<signupInput>({
        email:"",
        password:"",
        name:""
    })

   async function sendRequest(){
    try{
     const response=await axios.post(`${BACKEND_URL}${type==="signup"?"signup" :"signin"} `,postInputs)
     console.log(`${BACKEND_URL}${type==="signup"?"signup" :"signin"} `)
     console.log(response)
     const jwt=response.data.token
     console.log(jwt)
     if(jwt===undefined){
        alert(response.data)
     }else{    
     localStorage.setItem("jwt",jwt)
     navigate("/blog:id")
    }
    }
    catch(e){
        alert(e)
    }
   } 
    return(
        <>
    
        {console.log(BACKEND_URL)}
        <div className="flex flex-col bg-white h-screen justify-center items-center">
        <div className="flex justify-center flex-col  " >
        <div className="px-4" >
        <div className="font-bold text-3xl">{type==="signup" ?"Create an account" :"Login to existing account"}</div>
        <div className = "font-light text-lg">{type==="signup" ? "Already have an account  ?" : "Don't have an account ?" } <Link to={type=="signup" ?"/signin" :"/signup"}className="hover:underline" >{type==="signup" ?"Signin" :"Signup"}</Link></div>
        </div> 
        {type =="signup" ? <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
          setpostInputs({
            ...postInputs,
            name:e.target.value
          })
        }} /> : null }
        <LabelledInput label="Email" placeholder="yourmail@gmail.com" onChange={(e)=>{
        setpostInputs({
            ...postInputs,
            email:e.target.value
        }) 
          }} />
         <LabelledInput label="Password" placeholder="password" type="password" onChange={(e)=>{
        setpostInputs({
            ...postInputs,
            password:e.target.value
        }) 
          }} />

       <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5    dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 w-full" onClick={sendRequest}>{type=="signup" ? "Signup" :"Signin"}</button>

        </div>  

         </div >

        </>
    )
}