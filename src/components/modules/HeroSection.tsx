import RecentBlog from "@/components/modules/RecentBlog";
import AllBlogPost from "@/components/modules/AllBlogPost";
import commonData from "@/utils/mock/commonData.json"

export default function HeroSection() {
  return (
    <main className="py-4 flex w-full min-h-screen container mx-auto">
      <section className="flex-grow">
        <h1 className="text-center text-[200px] font-bold text-darkFontColor">{commonData?.projectTitle}</h1>

        <RecentBlog/>
        <AllBlogPost/>
      </section>
    </main>
  )
}