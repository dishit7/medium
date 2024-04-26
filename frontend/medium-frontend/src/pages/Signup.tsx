import { Auth } from "../components/Auth"
 import { Qoute } from "../components/Qoute"

export const Signup = ()=>{
    return (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
        <Auth type="signup"/>
        </div>
        <div className="none lg:block">
        <Qoute />
        </div>
        
        </div>        
        </>
    )
}