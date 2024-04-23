 
// authMiddleware.ts
import { Context, Next } from 'hono';
import { decode } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/neon-http'
import {neon} from '@neondatabase/serverless'
import { User } from '../db/schema'
import { eq } from 'drizzle-orm';
export const authMiddleware=async(c :Context,next:Next)=>{
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql);
      const token=c.req.header('Authorization')
      if(!token){
        c.status(401)
        return c.text('unauthorized access')
      }
      else{
        try{
            const decoded_token=decode(token)
        //console.log(decoded_token.payload.email)
         
            const user=await db.select().from(User).where(eq(User.email,decoded_token.payload.email))
            console.log(user[0])
            if(!user[0]){
                c.status(401);
                return c.text('Unauthorized: Authentication failed');
            }
            else{
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
