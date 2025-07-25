import { ApiGetPost } from "@/api/blog";
import BlogPostGrid from "../common/CommonBlogPostGrid";

/**
 * A page that displays all blog posts.
 *
 * @param {object} props - The component props.
 * @param {number} props.limit - The number of posts to show per page.
 *
 * @returns {ReactElement} The component.
 */
const ExplorePage = ({ limit }: any) => {
  return (
    <BlogPostGrid
      fetchFunction={ApiGetPost}
      title="All Blog Posts"
      limit={limit}
    />
  );
};

export default ExplorePage;
