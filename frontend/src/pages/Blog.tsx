import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
  const {id} = useParams();
  const {blog, loading} = useBlog(id);

  if(loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <FullBlog blog={blog}/>
    </div>
  )
}
