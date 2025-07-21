import { ApiGetPost } from "@/api/blog";
import BlogPostGrid from "../common/CommonBlogPostGrid";

const AllBlogPost = ({ limit }: any) => {
  return (
    <BlogPostGrid
      fetchFunction={ApiGetPost}
      title="All Blog Posts"
      limit={limit}
    />
  );
};

export default AllBlogPost;
