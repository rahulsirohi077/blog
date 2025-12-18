import type { Blog } from '../hooks'
import { Appbar } from './Appbar'
import { Avatar } from './BlogCard'

export const FullBlog = ({ blog }: { blog: Blog | undefined }) => {
    return (
        <div>
            <Appbar />
            <div className='flex justify-center'>
                <div className='grid grid-cols-12 px-10 pt-10 w-[80%]'>
                    <div className='col-span-8'>
                        <div className='text-5xl font-extrabold'>
                            {blog?.title}
                        </div>
                        <div className='text-slate-500 pt-2'>
                            posted on 2nd december 2023
                        </div>
                        <div className='text-3xl pt-4'>
                            {blog?.content}
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <div className='text-slate-600 text-xl'>
                            Author
                        </div>
                        <div className='flex'>
                            <div className='pr-4 flex items-center'>
                                <Avatar size='big' name={blog?.author?.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className='text-xl font-bold'>
                                    {blog?.author?.name || "Anonymous"}
                                </div>
                                <div className='pt-2 text-slate-500'>
                                    Random Catch Phrase About the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
