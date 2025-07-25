import InteractionRecommendation from "@/components/modules/InteractionRecommendation";
import HeroLayout from "@/layouts/HeroLayout";

/**
 * A page that displays a list of recommended posts based on the user's
 * interactions with other users.
 *
 * @returns {ReactElement} The component.
 */
const Interaction = () => {
  return <InteractionRecommendation />;
};

export default Interaction;

Interaction.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
