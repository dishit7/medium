import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import { Posts, User } from './db/schema'
import { eq } from 'drizzle-orm'
import { decode, sign, verify } from 'hono/jwt'
import authMiddleware from './middleware/authmiddleware' 
import { PostgresError } from 'postgres'
import { signupInput } from '@dishit7/medium-common'
 import { cors } from 'hono/cors'
import { PostgresJsPreparedQuery } from 'drizzle-orm/postgres-js'
const secret_key='secret_key'
export type Env ={
  DATABASE_URL:string ,
  SECRET_KEY:string
}
export type Variables ={
  author_id:string
}
const app = new Hono<{Bindings:Env,Variables:Variables}>()
app.use(cors())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post("/user/signup",async (c)=>{
     const sql=neon(c.env.DATABASE_URL)
    //console.log("url is"+c.env.DATABASE_URL)
   // console.log("secret is"+c.env.SECRET_KEY)

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
    // console.log("secret"+c.env.SECRET_KEY)
     const token=await sign({email:email},secret_key)
     console.log(token)
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
    const token= await sign({email:email},secret_key)
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
  const {title,content}=await c.req.json()
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

app.get("/blogs",authMiddleware,async(c)=>{
  const sql=neon(c.env.DATABASE_URL)
  const db=drizzle(sql)
  const blogs=await db.select({
    id:Posts.id,
    title:Posts.tilte,
    content:Posts.content,
    author_name:User.name
  }).from(Posts).leftJoin(User,eq(Posts.authorId,User.id))
  console.log(blogs)
  return c.json({"blogs":blogs})
})
app.get("/blog/:id",authMiddleware,async(c)=>{
const id= c.req.param('id')
console.log(id)
const sql=neon(c.env.DATABASE_URL)
const db=drizzle(sql)
const selected_blog=await db.select({
  id:Posts.id,
  tilte:Posts.tilte,
  content:Posts.content,
  author:User.name
},).from(Posts).where(eq(Posts.id,id)).leftJoin(User,eq(Posts.authorId,User.id))
console.log(selected_blog)
return c.json(selected_blog[0])
})



export default app
