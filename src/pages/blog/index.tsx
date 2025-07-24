import ExplorePage from "@/components/modules/ExplorePage";
import HeroLayout from "@/layouts/HeroLayout";

const Blog = () => {
  return <ExplorePage />;
};

export default Blog;

Blog.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
