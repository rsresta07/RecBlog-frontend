import { APIInteractionRecommendedPosts } from "@/api/recommendation";
import BlogPostGrid from "../common/CommonBlogPostGrid";

// Display Cards of the Blog
// TODO: Make the links work
const InteractionRecommendation = ({ limit }: any) => {
  return (
    <BlogPostGrid
      fetchFunction={APIInteractionRecommendedPosts}
      title="For You"
      limit={limit}
    />
  );
};

export default InteractionRecommendation;
