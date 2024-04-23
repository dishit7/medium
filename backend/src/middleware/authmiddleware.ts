 
// authMiddleware.ts
import { Context, Next } from 'hono';
import { decode,verify} from 'hono/jwt';
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import { User } from '../db/schema'
import { eq } from 'drizzle-orm';
const secret_key='secret_key' 
 export const authMiddleware=async(c :Context,next:Next)=>{
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql);
      const token=c.req.header('Authorization')
      console.log(token)
      if(!token){
        c.status(401)
        return c.text('unauthorized access')
      }
      else{
        try{
         console.log(c.env.SECRET_KEY)
             const decoded_token=await verify(token,c.env.SECRET_KEY)
            console.log(decoded_token )
            const user=await db.select().from(User).where(eq(User.email,decoded_token.email))
            
            console.log(user[0])
            if(!user[0]){
                c.status(401);
                return c.text('Unauthorized: Authentication failed');
            }
            else{
               c.set('author_id',user[0].id)
            await next()
            }
         }
         catch(err){
            console.log(err)
            c.status(401);
            return c.text('Unauthorized: Authentication failed');

         }
      }
      return
}


export default authMiddleware;
