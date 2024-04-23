import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import { User } from './db/schema'
import { eq } from 'drizzle-orm'
import { resolveCallback } from 'hono/utils/html'
import { decode, sign, verify } from 'hono/jwt'
import authMiddleware from './middleware/authmiddleware' 
const secret_key='secret_key'
export type Env ={
  DATABASE_URL:string
  SECRET_KEY:string
}
const app = new Hono<{Bindings:Env}>()
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post("/user/signup",async (c)=>{
     const sql=neon(c.env.DATABASE_URL)
     const db= drizzle(sql)
     const {name,email,password} = await c.req.json()
     console.log(name)

     const resp =await db.insert(User).values({
      name:name,
      email:email,
      password:password
     }).returning({
      id:User.id
     })
     console.log(resp)
     const token=await sign({email:email},c.env.SECRET_KEY)
      return c.json({
                   msg:"signup successfull",
                   token 
                  })
})


 
app.post("/user/signin",async (c)=>{
  const sql=neon(c.env.DATABASE_URL)
  const db=drizzle(sql)
  const {email,password}=await c.req.json()
  const user=await db.select( ).from(User).where(eq(User.email,email))
  console.log(user[0])
  if(user[0]){
   
  if (password==(user[0].password)){
    const token= await sign({email:email},c.env.SECRET_KEY)
    console.log(token)

    return c.json({token})
  }
  else{
    return c.text("password incorrect")
  }

  }else {
    return c.text("user not found")
  }

    
})


app.post("/blog",authMiddleware,(c)=>{
  return c.text('post blog')
})

app.put("/blog",(c)=>{
  return c.text('put blog')
})

app.get("/blog/:id",(c)=>{
const id= c.req.param('id')
console.log('id')
return c.text('blog')
})


export default app
