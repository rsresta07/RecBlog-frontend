import RecentBlog from "@/components/modules/RecentBlog";
import PostPagination from "./BlogPostPagination";
import RecommendedBlog from "./RecommendedBlog";

export default function HeroSection() {
  return (
    <main className="pt-4 flex w-full container mx-auto bg-light-bg">
      <section className="flex-grow">
        {/* <h1 className="text-center text-[200px] font-bold text-dark-font">
          {commonData?.projectTitleEng}
        </h1> */}
        <div className="mt-12 flex flex-col gap-4 mb-[10rem]">
          <h1 className="text-center text-[50px] font-bold text-primary">
            Welcome to RecBlog
          </h1>
          <h1 className="text-center text-[25px] text-secondary">
            A platform where you can read and write about your favorite topics.
          </h1>
        </div>
        <RecentBlog />
        <RecommendedBlog />
        <PostPagination />
      </section>
    </main>
  );
}
