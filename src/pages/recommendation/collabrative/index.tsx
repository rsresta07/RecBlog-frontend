import FinalRecommendation from "@/components/modules/FinalRecommendation";
import SimilarityRecommendation from "@/components/modules/SimilarityRecommendation";
import UserBasedRecommendation from "@/components/modules/UserBasedRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

const UserBased = () => {
  return <UserBasedRecommendation />;
};

export default UserBased;

UserBased.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
