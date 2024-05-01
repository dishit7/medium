import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"
import { BlogSkeleton } from "./BlogSkeleton"

export const Blogs = ( ) => {

    const {loading,blogs}=useBlogs()
    if(loading){
        return <div><BlogSkeleton ></BlogSkeleton></div>
    }else{

    }
    return (
        <>
        <Appbar />
        <BlogCard  id={7} author="Dishit Karia" title="You are exactly where you are meant to be"content="Steve Jobs, renowned for his visionary approach to technology and design, had a unique ability to 'connect the dots' backward. He possessed a remarkable talent for seeing patterns and connections in seemingly disparate ideas, events, and experiences. Rather than solely focusing on the present or future, Jobs had a keen sense of history and context, allowing him to draw inspiration and insights from past experiences and innovations. By connecting the dots backward, Jobs was able to anticipate trends, identify opportunities, and pioneer groundbreaking products and services. His unconventional approach to problem-solving and creativity continues to inspire generations of innovators and entrepreneurs worldwide."
        publishedDate="2nd March"/>
                <BlogCard id={7} author="Dishit Karia" title="You are exactly where you are meant to be"content="Steve Jobs, renowned for his visionary approach to technology and design, had a unique ability to 'connect the dots' backward. He possessed a remarkable talent for seeing patterns and connections in seemingly disparate ideas, events, and experiences. Rather than solely focusing on the present or future, Jobs had a keen sense of history and context, allowing him to draw inspiration and insights from past experiences and innovations. By connecting the dots backward, Jobs was able to anticipate trends, identify opportunities, and pioneer groundbreaking products and services. His unconventional approach to problem-solving and creativity continues to inspire generations of innovators and entrepreneurs worldwide."
        publishedDate="2nd March"/>
               <BlogCard id={7} author="Dishit Karia" title="You are exactly where you are meant to be"content="Steve Jobs, renowned for his visionary approach to technology and design, had a unique ability to 'connect the dots' backward. He possessed a remarkable talent for seeing patterns and connections in seemingly disparate ideas, events, and experiences. Rather than solely focusing on the present or future, Jobs had a keen sense of history and context, allowing him to draw inspiration and insights from past experiences and innovations. By connecting the dots backward, Jobs was able to anticipate trends, identify opportunities, and pioneer groundbreaking products and services. His unconventional approach to problem-solving and creativity continues to inspire generations of innovators and entrepreneurs worldwide."
        publishedDate="2nd March"/>
        

        {blogs.map((blog)=>{
         return (
            <div>
            <BlogCard id={blog.id} title={blog.title} author={blog.author_name} content={blog.content} publishedDate="27th April 2024"/>
            </div>
         )
        })}
         </>

    )
}