import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URl } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string | null
    }
}

export const useBlogs = () => {
    const [loading,setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URl}/api/v1/blog/bulk`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            setBlogs(res.data.posts)
            setLoading(false);
        })
    },[])

    return {blogs, loading};
}

export const useBlog = (id : string|undefined) => {
    const [loading,setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URl}/api/v1/blog/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            setBlog(res.data.post)
            setLoading(false);
        })
    },[id])

    return {blog, loading};
}