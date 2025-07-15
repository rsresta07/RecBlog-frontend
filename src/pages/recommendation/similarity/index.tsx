import FinalRecommendation from "@/components/modules/FinalRecommendation";
import SimilarityRecommendation from "@/components/modules/SimilarityRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

const Similarity = () => {
  return <SimilarityRecommendation />;
};

export default Similarity;

Similarity.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
