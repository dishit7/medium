import { Hono } from 'hono'


export type Env ={
  DATABASE_URL:string
}
const app = new Hono<{Bindings:Env}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.post("/user/signip",(c)=>{
     return c.text("hono signup")
})

app.post("/user/signin",(c)=>{
    return c.text("hono signin")
})


app.post("/blog",(c)=>{
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
