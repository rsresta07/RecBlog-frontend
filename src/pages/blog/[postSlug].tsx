import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";
import posts from "@/utils/mock/posts.json";
import Image from "next/image";
import Link from "next/link";

const PostDetail = () => {
  const router = useRouter();
  const postSlug = router.query;
  return (
    <main className="container mx-auto grid grid-cols-10 gap-[4rem] mt-[4rem]">
      <section className="col-span-3">
        <h2 className="text-2xl font-bold text-darkFontColor mb-4">
          Recent blog post
        </h2>
        <div>
          {posts?.slice(0, 6)?.map((post) => (
            <div className={`mb-8`} key={post?.id}>
              <Link href={`/blog/${post?.slug}`}>
                <Image
                  src={post?.image}
                  alt={post?.title}
                  width={1024}
                  height={1024}
                  className="h-[13rem] object-cover"
                />
              </Link>
              <div>
                <span className={`text-purple-700 text-sm`}>
                  <Link href={`#`}>{post?.author}</Link>&nbsp;-&nbsp;
                  <Link href={`#`}>{post?.date}</Link>
                </span>
                <Link href={`/blog/${post?.slug}`}>
                  <h3 className={`text-xl line-clamp-1`}>{post?.title}</h3>
                  <p className={`mb-4 line-clamp-3 text-sm`}>
                    {post?.description}
                  </p>
                </Link>
                {post?.tag?.map((tag) => (
                  <span
                    key={tag?.id}
                    className="text-sm px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
                  >
                    <Link href={`#`}>{tag?.title}</Link>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="col-span-7 flex flex-col gap-8">
        <span className={`text-purple-700 text-sm`}>
          <Link href={`#`}>Rameshwor</Link>&nbsp;-&nbsp;
          <Link href={`#`}>2025/03/30</Link>
        </span>
        <h2 className={`text-4xl font-bold`}>UX review presentation</h2>
        <Image
          src="/L007.jpg"
          alt="blog post"
          width={1024}
          height={1024}
          className="w-auto object-cover"
        />
        <p>
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
        <p>
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
        <p>
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
        <Image
          src="/L009.jpg"
          alt="blog post"
          width={1024}
          height={1024}
          className="w-auto object-cover"
        />
        <p>
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
        <p>
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
        <p>
          A grid system is a design tool used to arrange content on a webpage.
          It is a series of vertical and horizontal lines that create a matrix
          of intersecting points, which can be used to align and organize page
          elements. Grid systems are used to create a consistent look and feel
          across a website, and can help to make the layout more visually
          appealing and easier to navigate.
        </p>
      </section>
    </main>
  );
};

export default PostDetail;
PostDetail.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
