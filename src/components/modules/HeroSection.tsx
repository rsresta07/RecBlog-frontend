import RecentBlog from "@/components/modules/RecentBlog";
import PostPagination from "./BlogPostPagination";

export default function HeroSection() {
  return (
    <main className="pt-4 flex w-full container mx-auto">
      <section className="flex-grow">
        {/* <h1 className="text-center text-[200px] font-bold text-dark-font">
          {commonData?.projectTitleEng}
        </h1> */}
        <div className="mt-12 mb-24 flex flex-col gap-4">
          <h1 className="text-center text-[50px] font-bold text-dark-font">
            Welcome to RecBlog
          </h1>
          <h1 className="text-center text-[25px]  text-dark-font">
            A platform where you can read and write about your favorite topics.
          </h1>
        </div>
        <RecentBlog />
        <PostPagination />
      </section>
    </main>
  );
}
