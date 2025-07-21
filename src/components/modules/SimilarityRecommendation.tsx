import { APIGetRawRecommendedPosts } from "@/api/recommendation";
import BlogPostGrid from "../common/CommonBlogPostGrid";

// Display Cards of the Blog
// TODO: Make the links work
const SimilarityRecommendation = ({ limit }: any) => {
  return (
    <BlogPostGrid
      fetchFunction={APIGetRawRecommendedPosts}
      title="For You"
      limit={limit}
    />
  );
};

export default SimilarityRecommendation;
