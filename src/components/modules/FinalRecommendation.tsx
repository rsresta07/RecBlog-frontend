import { APIFinalRecommendedPosts } from "@/api/recommendation";
import BlogPostGrid from "../common/CommonBlogPostGrid";

const FinalRecommendation = ({ limit }: any) => {
  return (
    <BlogPostGrid
      fetchFunction={APIFinalRecommendedPosts}
      title="For You"
      limit={limit}
    />
  );
};

export default FinalRecommendation;
