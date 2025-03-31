import AllBlogPost from "@/components/modules/AllBlogPost";
import HeroLayout from "@/layouts/HeroLayout";

const Blog = () => {
  return <AllBlogPost />;
};

export default Blog;

Blog.getLayout = (page) => <HeroLayout>{page}</HeroLayout>;
