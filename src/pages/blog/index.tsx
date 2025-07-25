import ExplorePage from "@/components/modules/ExplorePage";
import HeroLayout from "@/layouts/HeroLayout";

/**
 * A component that renders the blog page using the ExplorePage component.
 *
 * @returns {JSX.Element} The rendered blog page wrapped in the ExplorePage component.
 */
const Blog = () => {
  return <ExplorePage />;
};

export default Blog;

Blog.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
