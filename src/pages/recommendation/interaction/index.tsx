import FinalRecommendation from "@/components/modules/FinalRecommendation";
import InteractionRecommendation from "@/components/modules/InteractionRecommendation";
import SimilarityRecommendation from "@/components/modules/SimilarityRecommendation";
import UserBasedRecommendation from "@/components/modules/UserBasedRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

const Interaction = () => {
  return <InteractionRecommendation />;
};

export default Interaction;

Interaction.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
