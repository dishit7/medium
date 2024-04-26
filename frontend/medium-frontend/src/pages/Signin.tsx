import { Auth } from "../components/Auth"
import { Qoute } from "../components/Qoute"

export const Signin = ()=>{
    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2" >
            <div><Auth type="signin" /></div>
            <div className="none lg:block"><Qoute /></div>
        </div>
         </>
    )
}