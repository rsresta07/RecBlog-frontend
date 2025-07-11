import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/utils/hooks/useAuth";

import { ApiGetPost, APIGetPostDetails } from "@/api/blog";
import {
  APIFollowUser,
  APIUnfollowUser,
  APIAmIFollowing,
  APILikePost,
  APIUnlikePost,
  APIDoILike,
  APIAddComment,
  APIListComments,
} from "@/api/social";

import { useEffect, useState, useCallback } from "react";
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
import { truncateHTML } from "@/utils/helpers/helpers";
import LoginModal from "@/components/modals/LoginModal";

const PostDetail = () => {
  const router = useRouter();
  const { isReady, query } = router;
  const postSlug = typeof query.postSlug === "string" ? query.postSlug : "";
  const { user } = useAuth();
  const isLoggedIn = !!user;

  // UI State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [details, setDetails] = useState<any | null>(null);
  const [postData, setPostData] = useState<any[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  const [shareOpen, { open: openShare, close: closeShare }] =
    useDisclosure(false);
  // login modal control
  const [loginOpen, { open: openLogin, close: closeLogin }] =
    useDisclosure(false);

  // initial fetch
  const loadDetails = useCallback(async () => {
    if (!postSlug) return;
    const { data } = await APIGetPostDetails(postSlug);
    setDetails(data);
    setComments(data?.comments || []);

    /* pre‑load like / follow status (optional if BE sends flags) */
    if (data?.user?.id) {
      APIAmIFollowing(data.user.id)
        .then((r: any) => setIsFollowing(r?.data?.following))
        .catch(() => {});
    }
    if (data?.id) {
      APIDoILike(data.id)
        .then((r: any) => setLiked(r?.data?.liked))
        .catch(() => {});
    }

    await refreshComments(data.id);
  }, [postSlug]);

  const loadRecent = useCallback(async () => {
    const r = await ApiGetPost();
    setPostData(r?.data || []);
  }, []);

  useEffect(() => {
    if (isReady) loadDetails();
  }, [isReady, loadDetails]);

  useEffect(() => {
    loadRecent();
  }, [loadRecent]);

  // follow / unfollow
  const handleFollowToggle = async () => {
    if (!details?.user?.id) return;
    try {
      if (isFollowing) {
        await APIUnfollowUser(details.user.id);
      } else {
        await APIFollowUser(details.user.id);
      }
      setIsFollowing((p) => !p);
    } catch (e) {
      console.error("follow/unfollow failed:", e);
    }
  };

  // like / unlike
  const handleLikeToggle = async () => {
    if (!details?.id) return;
    try {
      if (liked) {
        await APIUnlikePost(details.id);
      } else {
        await APILikePost(details.id);
      }
      setLiked((p) => !p);
    } catch (e) {
      console.error("like/unlike failed:", e);
    }
  };

  // refresh comments
  const refreshComments = async (postId: string) => {
    if (!postId) return;
    const r = await APIListComments(postId);
    setComments(r.data || []);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !details?.id) return;
    try {
      await APIAddComment(details.id, newComment.trim());
      setNewComment("");
      refreshComments(details.id); // pull fresh list
    } catch (e) {
      console.error("comment failed:", e);
    }
  };

  // scroll to comment section
  const scrollToComments = () => {
    const el = document.getElementById("comment-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const likeCommentSection = () => (
    <section className="flex items-center justify-between bg-slate-100 p-2 px-4 rounded-lg">
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
          onClick={scrollToComments}
          variant="transparent"
          aria-label="Comment on post"
        >
          <IconMessage stroke={2} />
        </Button>
        <Button onClick={openShare} variant="transparent" radius="lg">
          <IconShare stroke={2} />
        </Button>
        <ShareModal opened={shareOpen} onClose={closeShare} />
      </div>
    </section>
  );

  return (
    <main className="container mx-auto grid grid-cols-12 gap-16 pt-16">
      <section className="col-span-8 flex flex-col gap-4">
        {/* Title + tags */}
        <header className="flex items-start justify-between gap-8">
          <h1 className="text-4xl font-bold text-primary">{details?.title}</h1>

          <div className="flex justify-end flex-1">
            <div
              className={`flex flex-wrap max-w-[200px] ${details?.tags?.length <= 2 ? "whitespace-nowrap" : ""}`}
            >
              {details?.tags?.slice(0, 3).map((t: any) => (
                <span
                  key={t.id}
                  className="px-2 bg-secondary rounded-lg text-[#fefe] m-1 w-fit"
                >
                  <Link href="#">{t.title}</Link>
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* author + follow */}
        <div className="flex gap-8">
          <div className="flex items-end gap-2 text-slate-700">
            <p className="text-primary text-xl">
              {details?.user && (
                <Link href={`/user/${details.user.username}`}>
                  {details?.user?.fullName}
                </Link>
              )}
            </p>
            <p className="text-secondary">{details?.user?.position}</p>
          </div>
          <div>
            <CommonButton
              label={isFollowing ? "Following" : "Follow"}
              onClick={handleFollowToggle}
              radius="lg"
              size="xs"
              color="#F28F3B"
            />
          </div>
        </div>

        <hr />

        {/* {likeCommentSection()} */}

        {/* image + content */}
        <section className="flex flex-col gap-8">
          {details?.image && (
            <Image
              src={details.image}
              alt={details.title || "Blog Post Image"}
              width={1024}
              height={1024}
              className="w-full object-contain rounded-lg"
              priority
            />
          )}

          {!user ? (
            <div className="relative overflow-hidden rounded-lg">
              {/* Blurred content */}
              <div
                className="blur-sm select-none pointer-events-none max-h-[300px] overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(details?.content || "", 1000),
                }}
              />

              {/* Gradient + button overlay */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent flex justify-center items-end pb-4">
                <Button
                  onClick={() => setShowLoginModal(true)}
                  variant="outline"
                >
                  Show more
                </Button>
              </div>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: details?.content }} />
          )}

          <LoginModal
            openRegisterModal={() => {}}
            triggerOpen={showLoginModal}
            setTriggerOpen={setShowLoginModal}
          />
        </section>

        {/* comments */}
        <section className="flex flex-col gap-4 mt-12" id="comment-section">
          {isLoggedIn && likeCommentSection()}

          {(isLoggedIn || comments.length > 0) && ( // show nothing if guest & 0 comments
            <>
              <h3 className="text-xl font-semibold text-secondary">Comments</h3>

              {isLoggedIn && (
                <>
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
                </>
              )}

              {comments.length > 0 && (
                <div className="space-y-4 max-h-64 overflow-y-auto border p-4 rounded-lg bg-white shadow-sm">
                  {comments.map((c) => (
                    <div key={c.id} className="border-b pb-2 last:border-b-0">
                      <p className="font-semibold">
                        {c.user?.fullName || "Anonymous"}
                      </p>
                      <p>{c.content}</p>
                      <small className="text-gray-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </section>

      {/* recent posts */}
      <aside className="col-span-4">
        <h2 className="text-2xl font-bold text-dark-font mb-4">
          Recent blog posts
        </h2>
        {postData.slice(0, 6).map((p) => (
          <article key={p.id} className="mb-8">
            <Link href={`/blog/${p.slug}`}>
              <Image
                src={p.image}
                alt={p.title || "Blog Post Image"}
                width={1024}
                height={1024}
                className="h-56 object-cover rounded-lg"
              />
            </Link>
            <div>
              <span className="text-primary text-sm">
                {p.user && (
                  <Link href={`/user/${p.user.slug}`}>{p.user.fullName}</Link>
                )}
              </span>
              <Link href={`/blog/${p.slug}`}>
                <h3 className="text-xl text-primary font-bold line-clamp-1">
                  {p.title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: p.content }}
                  className="mb-4 line-clamp-2 text-sm"
                />
              </Link>
              {p.tags?.map((t: any) => (
                <span
                  key={t.id}
                  className="text-sm px-2 bg-secondary rounded-lg text-[#fefe] m-1"
                >
                  <Link href="#">{t.title}</Link>
                </span>
              ))}
            </div>
          </article>
        ))}
      </aside>
    </main>
  );
};

PostDetail.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
export default PostDetail;
