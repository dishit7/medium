// db/schema.ts


 import { pgTable, serial, text, doublePrecision, uuid,varchar,boolean} from 'drizzle-orm/pg-core';
import { Many, relations } from 'drizzle-orm/relations';


export const User= pgTable('users',{
  id: uuid("id").primaryKey().defaultRandom(),
  email:varchar("email",{length:255}).notNull().unique(),
  name:varchar('name',{length:300}).notNull(),
  password:varchar("password",{length:64}),


})


export const Posts =pgTable('posts',{
  id:serial("id").primaryKey() ,
  tilte:varchar("title",{length:50}).notNull(),
  content:varchar("content",{length:300}),
  published:boolean("published").notNull(),
  authorId:uuid("authorid").references(()=>User.id).notNull()

})
 
 

