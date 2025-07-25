import UserBasedRecommendation from "@/components/modules/UserBasedRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

/**
 * A page that displays a list of user-based recommended blog posts.
 *
 * This page uses the UserBasedRecommendation component to fetch and display
 * a list of recommended blog posts based on the user's preferences and
 * interactions.
 *
 * @returns {ReactElement} The UserBasedRecommendation component.
 */
const UserBased = () => {
  return <UserBasedRecommendation />;
};

export default UserBased;

UserBased.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
