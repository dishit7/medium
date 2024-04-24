import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import { Posts, User } from './db/schema'
import { eq } from 'drizzle-orm'
import { decode, sign, verify } from 'hono/jwt'
import authMiddleware from './middleware/authmiddleware' 
import { PostgresError } from 'postgres'
import { signupInput } from '@dishit7/medium-common'
import { COMPOSED_HANDLER } from 'hono/hono-base'
const secret_key='secret_key'
export type Env ={
  DATABASE_URL:string
  SECRET_KEY:string
}
export type Variables ={
  author_id:string
}
const app = new Hono<{Bindings:Env,Variables:Variables}>()
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post("/user/signup",async (c)=>{
     const sql=neon(c.env.DATABASE_URL)
     const db= drizzle(sql)
     const {name,email,password} = await c.req.json()
     const body=await c.req.json()
     console.log(body)
     const validation=signupInput.safeParse(body)
     console.log(validation)
     if(!validation.success){
      return  c.text("err")
     }
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


app.post("/blog",authMiddleware,async(c)=>{
  const sql=neon(c.env.DATABASE_URL)
  const db=drizzle(sql)
  const authorid=c.get('author_id')
  const {title,content,published}=await c.req.json()
  const response= await db.insert(Posts).values({
    tilte:title,
    content:content,
    published:true,
    authorId:c.get('author_id')
  }).returning({
    id:Posts.id
  })
  console.log(response)
   return c.text('post blog')
})

app.put("/blog",authMiddleware,async(c)=>{
  const sql=neon(c.env.DATABASE_URL)
  const db= drizzle(sql)
 const{id,title,content}=await c.req.json()
 const updated_blog=await db.update(Posts).set({
  tilte:title,
  content:content
 }).where(eq(Posts.id,id)).returning({
  content:Posts.content
 })
  console.log(updated_blog)
  return c.text('put blog')
})

app.get("/blogs",async(c)=>{
  const sql=neon(c.env.DATABASE_URL)
  const db=drizzle(sql)
  const blogs=await db.select().from(Posts)
  console.log(blogs)
  return c.json({"blogs":blogs})
})
app.get("/blog/:id",async(c)=>{
const idString= c.req.param('id')
const id=idString.split(':')[1]
console.log(id)
const sql=neon(c.env.DATABASE_URL)
const db=drizzle(sql)
const selected_blog=await db.select().from(Posts).where(eq(Posts.id,id))
console.log(selected_blog)
return c.text('blog')
})



export default app
