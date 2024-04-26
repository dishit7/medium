import { ChangeEvent, useState } from "react"
interface LabelledInput {
  label:string,
  placeholder:string,
  onChange: (e: ChangeEvent<HTMLInputElement>)=>void,
  type ?:string ;
}


export const LabelledInput = ({label,placeholder,onChange,type} :LabelledInput) =>{

  
    return(<>
     <div className= "pt-4">
     <label  className=" block mb-2 text-lg font-semibold text-black    w-full rounded-lg  ">{label}</label>
     <input   id="first_name" type={type || "text"}className="block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-100  w-full p-2.5  " placeholder={placeholder}  onChange={onChange}required />

     </div>
    </>)
}