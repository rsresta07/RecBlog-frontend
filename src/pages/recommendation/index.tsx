import FinalRecommendation from "@/components/modules/FinalRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

const Recommendation = () => {
  return <FinalRecommendation />;
};

export default Recommendation;

Recommendation.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
