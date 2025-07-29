import ExplorePage from "@/components/modules/ExplorePage";
import HeroLayout from "@/layouts/HeroLayout";
import Head from "next/head";

/**
 * A component that renders the blog page using the ExplorePage component.
 *
 * @returns The rendered blog page wrapped in the ExplorePage component.
 */
const Blog = () => {
  return (
    <>
      <Head>
        <title>Blog | RecBlog</title>
        <meta name="description" content={`Blog Page of RecBlog.`} />
        <meta property="og:title" content="Blog" />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <ExplorePage />
    </>
  );
};

export default Blog;

Blog.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
