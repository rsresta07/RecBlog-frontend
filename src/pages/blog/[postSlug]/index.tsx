import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ApiGetPost, APIGetPostDetails } from "@/api/blog";
import { useEffect, useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import {
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconShare,
} from "@tabler/icons-react";
import ShareModal from "@/components/modals/ShareModal";
import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CustomSunEditor from "@/components/common/CommonSunEditor";

const PostDetail = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const postSlug =
    typeof query.postSlug === "string" ? query.postSlug : undefined;

  const [details, setDetails] = useState<any>();
  const [postData, setPostData] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const fetchBlogDetails = async (slug: string) => {
    try {
      const { data } = await APIGetPostDetails(slug);
      setDetails(data);
      setComments(data.comments || []);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ApiGetPost();
      setPostData(response?.data);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    if (!isReady || !postSlug) return;
    fetchBlogDetails(postSlug);
  }, [isReady, postSlug]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollowToggle = async () => {
    try {
      if (!details?.user) return;
      // TODO: Implement follow/unfollow logic here
      console.log("Toggling follow for user:", details.user.username);
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to follow/unfollow:", error);
    }
  };

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
    console.log(liked ? "Unlike clicked" : "Like clicked");
    // TODO: Call API to like/unlike post
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (details?.user) {
      // TODO: Fetch follow status from API for details.user.id
      // setIsFollowing(followStatus);
    }
  }, [router.isReady, details]);

  const likeCommentSection = () => {
    return (
      <section className="flex items-center justify-between bg-slate-200 p-2 px-4 rounded-lg">
        <div className="flex items-center">
          <ActionIcon
            onClick={handleLikeToggle}
            variant="transparent"
            size="xl"
            color="red"
            aria-label={liked ? "Unlike post" : "Like post"}
          >
            {liked ? <IconHeartFilled /> : <IconHeart />}
          </ActionIcon>
          <Button
            onClick={() => {
              const commentSection = document.getElementById("comment-section");
              if (commentSection)
                commentSection.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Comment on post"
            variant="transparent"
          >
            <IconMessage stroke={2} />
          </Button>
        </div>
        <Button onClick={open} variant="default" radius="lg">
          <IconShare stroke={2} />
        </Button>
        <ShareModal opened={opened} onClose={close} />
      </section>
    );
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      // TODO: Call API to post comment, example:
      // await APIAddComment(postSlug, newComment);

      // For now, append locally (optimistic update)
      const fakeNewComment = {
        id: Date.now(),
        content: newComment,
        user: {
          fullName: "You",
        },
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, fakeNewComment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <main className="container mx-auto grid grid-cols-12 gap-[4rem] mt-[4rem]">
      <section className="col-span-8 flex flex-col gap-4">
        {/* Title & Tags */}
        <section className="flex items-center gap-4">
          <h2 className="text-4xl font-bold">{details?.title}</h2>
          <div>
            {details?.tags?.map((tag: any) => (
              <span
                key={tag?.id}
                className="px-2 bg-purple-200 rounded-lg text-purple-700 m-1"
              >
                <Link href="#">{tag?.title}</Link>
              </span>
            ))}
          </div>
        </section>
        {/* Author & Follow */}
        <section className="flex items-center justify-between">
          <p className="text-purple-700 text-xl">
            {details?.user && (
              <Link href={`/user/${details?.user?.username}`}>
                {details?.user?.fullName}
              </Link>
            )}
          </p>
          <div className="w-fit">
            <CommonButton
              label={isFollowing ? "Following" : "Follow"}
              onClick={handleFollowToggle}
              radius="lg"
            />
          </div>
        </section>

        {/* Likes & Comments Buttons */}
        {likeCommentSection()}

        {/* Image & Content */}
        <section className="flex flex-col gap-8">
          {details?.image && (
            <Image
              priority
              src={details.image}
              alt={details.title || "Blog Post Image"}
              width={1024}
              height={1024}
              className="w-full object-contain rounded-lg"
            />
          )}
          <div dangerouslySetInnerHTML={{ __html: details?.content }} />
        </section>
        {/* Comment list */}
        <section className="flex flex-col gap-4 mt-12">
          {likeCommentSection()}
          <section id="comment-section" className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            {/* Add new comment */}
            <div className="flex flex-col gap-2 mt-4">
              <textarea
                className="w-full border rounded p-2"
                rows={4}
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
              >
                Submit Comment
              </Button>
            </div>

            {/* Existing comments */}
            <div className="space-y-4 max-h-64 overflow-y-auto border p-4 rounded-lg bg-white shadow-sm">
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b pb-2 last:border-b-0"
                  >
                    <p className="font-semibold">
                      {comment.user?.fullName || "Anonymous"}
                    </p>
                    <p>{comment.content}</p>
                    <small className="text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </section>
        </section>
      </section>

      {/* Recent Blogs */}
      <section className="col-span-4">
        <h2 className="text-2xl font-bold text-dark-font mb-4">
          Recent blog post
        </h2>
        <div>
          {postData?.slice(0, 6)?.map((post) => (
            <div className="mb-8" key={post?.id}>
              <Link href={`/blog/${post?.slug}`}>
                <Image
                  src={post?.image}
                  alt={post?.title || "Blog Post Image"}
                  width={1024}
                  height={1024}
                  className="h-[14rem] object-cover rounded-lg"
                />
              </Link>
              <div>
                <span className="text-btn-text text-sm">
                  {post?.user && (
                    <Link href={`/user/${post?.user?.slug}`}>
                      {post?.user?.fullName}
                    </Link>
                  )}
                </span>
                <Link href={`/blog/${post?.slug}`}>
                  <h3 className="text-xl line-clamp-1">{post?.title}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                    className="mb-4 line-clamp-2 text-sm"
                  />
                </Link>
                {post?.tags?.map((tag: any) => (
                  <span
                    key={tag?.id}
                    className="text-sm px-2 bg-primary-btn rounded-lg text-btn-text m-1"
                  >
                    <Link href="#">{tag?.title}</Link>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PostDetail;
PostDetail.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
