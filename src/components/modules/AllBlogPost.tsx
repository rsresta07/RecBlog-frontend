import Image from "next/image";
import posts from "@/utils/mock/posts.json"

const AllBlogPost = () => {
  return (
    <main className="container mx-auto my-12">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">All Blog Posts</h2>

      <section className={`grid grid-cols-12 gap-8`}>
        {posts?.map((post) => (
          <div className={`col-span-3 grid grid-row-2 gap-8`} key={post?.id}>
            <Image src={post?.image} alt={post?.title} width={1024} height={1024} className="h-[13rem] object-cover"/>
            <div>
              <span className={`text-purple-700 text-sm`}>{post?.author} - {post?.date}</span>
              <h3 className={`text-xl line-clamp-1`}>{post?.title}</h3>
              <p className={`mb-4 line-clamp-2 text-sm`}>{post?.description}</p>
              {post?.tag?.map((tag) => (
                <span
                  key={tag?.id}
                  className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700"
                >
              {tag?.title}
            </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default AllBlogPost;