import FinalRecommendation from "@/components/modules/FinalRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

/**
 * A page that displays a user's recommended posts.
 *
 * This page uses the FinalRecommendation component to display a user's recommended posts.
 *
 * @returns A JSX element that renders a page of recommended blog posts.
 */
const Recommendation = () => {
  return <FinalRecommendation />;
};

export default Recommendation;

Recommendation.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
