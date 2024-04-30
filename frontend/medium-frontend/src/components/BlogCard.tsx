import { Link } from "react-router-dom"

interface BlogCardProps  {
    id:Number,
 author :string,
 title:string,
 content:string,
 publishedDate:string
}
export const BlogCard = ( {id,author,title,content,publishedDate}:BlogCardProps) => {
    return (
        <>
        <Link to={`/blog/${id}`}>
           <div className="flex justify-center" >
           <div className="flex flex-col items-center justify-center max-w-xl" >
           <div  className="flex items-center">
          <Avatar   author={author} />
           <div className="font-normal pl-2"> {author} .</div> 
           <div className="font-light pl-2">{publishedDate}</div>
           </div>
           
           <div className="font-bold text-3xl">
            {title}
           </div>
           <div className="font-serif text-slate-500 pt-1 pb-3">
            {content.slice(0,250) + "...."}
           </div>
           <div className="text-slate-500 font-light ">{`${Math.ceil(content.length/100)} min read`}</div>
           </div>
           </div>
           <hr className="my-4"/>
           </Link>
        </>
    )
}

export const Avatar = ({author }:{author:string, })=>{
     
    {console.log(`${author}`)}
    return (
        <>
<div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full  "h-10 w-10" `}>        
   <span className="font-medium text-gray-600 ">{author[0].toUpperCase()+author[1].toUpperCase() }</span>
          </div>
        </> 
    )
}