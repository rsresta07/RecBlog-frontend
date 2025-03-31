import { useState, useEffect } from "react";
import { Pagination } from "@mantine/core";
import posts from "@/utils/mock/posts.json";
import Link from "next/link";
import Image from "next/image";
import CommonLoader from "../common/CommonLoader";

function chunk<T>(array: T[], size: number): T[][] {
  return array.length
    ? [array.slice(0, size), ...chunk(array.slice(size), size)]
    : [];
}

const PostPagination = () => {
  const itemsPerPage = 6;
  const paginatedPosts = chunk(posts, itemsPerPage);
  const [loading, setLoading] = useState(false);
  const [activePage, setPage] = useState(1);
  const currentPosts = paginatedPosts[activePage - 1] || [];

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timeout);
  }, [activePage]);

  return (
    <main className="container mx-auto my-12">
      <h2 className="text-2xl font-bold text-darkFontColor mb-4">
        All Blog Posts
      </h2>
      <section>
        <section className="grid grid-cols-12 gap-8">
          {currentPosts.map((post) => (
            <div className="col-span-4 grid grid-row-2 gap-8" key={post?.id}>
              <Link href={`#`}>
                <Image
                  src={post?.image}
                  alt={post?.title}
                  width={1024}
                  height={1024}
                  className="h-[13rem] object-cover"
                />
              </Link>
              <div>
                <span className="text-purple-700 text-sm">
                  <Link href={`#`}>{post?.author}</Link>-
                  <Link href={`#`}>{post?.date}</Link>
                </span>
                <Link href={`#`}>
                  <h3 className="text-xl line-clamp-1">{post?.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm">
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
        </section>
        <div className="flex justify-center mt-4">
          <Pagination
            total={paginatedPosts.length}
            siblings={2}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        </div>
      </section>
    </main>
  );
};

export default PostPagination;
