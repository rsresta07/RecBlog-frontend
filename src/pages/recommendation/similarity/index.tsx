import FinalRecommendation from "@/components/modules/FinalRecommendation";
import SimilarityRecommendation from "@/components/modules/SimilarityRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

/**
 * Similarity component.
 *
 * This component renders the SimilarityRecommendation component which fetches and
 * displays a list of recommended blog posts based on the user's blog post preferences.
 *
 * @returns A JSX element representing the Similarity component.
 */
const Similarity = () => {
  return <SimilarityRecommendation />;
};

export default Similarity;

Similarity.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
