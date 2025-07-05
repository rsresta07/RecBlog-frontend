/* src/api/social.ts
 * Front‑end endpoints aligned with the latest Nest controllers.
 * If you change a route on the server, fix it here the same minute—no excuses.
 */
import { DeleteRequest, GetRequest, PostRequest } from "@/plugins/http";

/* ───────────── FOLLOW ───────────── */
export const APIFollowUser = (userId: string) =>
  PostRequest(`/follows/${userId}`, {});

export const APIUnfollowUser = (userId: string) =>
  DeleteRequest(`/follows/${userId}`);

export const APIAmIFollowing = (userId: string) =>
  GetRequest(`/follows/${userId}/status`);

/* ───────────── LIKE ───────────── */
export const APILikePost = (postId: string) =>
  PostRequest(`/post-likes/${postId}/like`, {});

export const APIUnlikePost = (postId: string) =>
  DeleteRequest(`/post-likes/${postId}/like`);

export const APIDoILike = (postId: string) =>
  GetRequest(`/post-likes/${postId}/like/status`);

/* ───────────── COMMENT ───────────── */
export const APIAddComment = (postId: string, content: string) =>
  PostRequest(`/posts/${postId}/comments`, { content });

export const APIListComments = (postId: string) =>
  GetRequest(`/posts/${postId}/comments`);
