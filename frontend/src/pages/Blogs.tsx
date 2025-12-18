import { Appbar } from '../components/Appbar';
import { BlogCard } from '../components/BlogCard';
import { BlogSkeleton } from '../components/BlogSkeleton';
import { useBlogs } from '../hooks';

export const Blogs = () => {
    const { blogs, loading} = useBlogs();

    if (loading){
       return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
  return (
    <div className='flex items-center flex-col'>
        <Appbar/>
        {
            blogs?.map((blog,indx)=>(
                <BlogCard
                    key={indx}
                    id={blog.id}
                    authorName={blog?.author?.name || "Anonymous"}
                    content={blog?.content}
                    title={blog?.title}
                    publishDate='18 dev 2025'
                />
            ))
        }
    </div>
  )
}
