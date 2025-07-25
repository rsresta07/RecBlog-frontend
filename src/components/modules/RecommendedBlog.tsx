import { Pagination } from "@mantine/core";
import ListSkeleton from "../common/CommonListSkeleton";
import { useRecommendedPosts } from "@/utils/hooks/useRecommendedPosts";
import CommonBlogList from "../common/CommonBlogList";

/**
 * A component that displays a list of recommended blog posts to the user.
 *
 * If there are no recommended posts and the component is not loading, the
 * component will not render anything.
 *
 * Otherwise, the component will render a list of recommended blog posts,
 * with a pagination component below it.
 *
 * The component uses the `useRecommendedPosts` hook to fetch the recommended
 * posts and to keep track of the current page and total number of pages.
 *
 * @returns A JSX element representing the recommended blog posts component.
 */
const RecommendedBlog = () => {
  const { currentPosts, totalPages, activePage, setPage, loading } =
    useRecommendedPosts();

  if (!currentPosts.length && !loading) return null;

  return (
    <main className="container mx-auto mb-[10rem]">
      <h2 className="text-3xl font-bold text-primary mb-[1rem]">
        Recommended For You
      </h2>
      <section>
        {loading ? (
          <ListSkeleton />
        ) : (
          <>
            <section className="grid grid-cols-12 gap-8">
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 transform transition-transform duration-300 hover:scale-[1.05]"
                >
                  <CommonBlogList post={post} />
                </div>
              ))}
            </section>
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                siblings={2}
                value={activePage}
                onChange={setPage}
                mt="sm"
                color="secondary-color"
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default RecommendedBlog;
