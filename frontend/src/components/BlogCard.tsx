import React from 'react'
import { Link } from 'react-router-dom';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishDate
}: BlogCardProps) => {
    return (

        <div className='border-b border-slate-200 pb-4 max-w-2xl w-full cursor-pointer'>
            <Link to={`/blog/${id}`}>
                <div className='flex'>
                    <Avatar name={authorName || "A"} />
                    <div className='font-extralight pl-2 text-sm flex flex-col justify-center'>{authorName}</div>
                    <div className='flex items-center justify-center pl-2'>
                        <Circle />
                    </div>
                    <div className='pl-2 font-thin text-slate-500 flex flex-col justify-center'>
                        {publishDate}
                    </div>
                </div>
                <div className='text-xl font-bold pt-2'>
                    {title}
                </div>
                <div className='text-xl font-thin'>
                    {content.slice(0, 100) + "..."}
                </div>
                <div className='text-slate-400 text-sm font-thin pt-2'>
                    {`${Math.ceil(content.length / 100)} minute(s)`}
                </div>
            </Link>
        </div>
    )
}

export function Circle() {
    return (
        <div className='h-1 w-1 rounded-full bg-slate-500'>
        </div>
    )
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
    </div>
}
