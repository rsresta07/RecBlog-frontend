import MainContent from "@/components/modules/HeroSection";
import HomeLayout from "@/layouts/HeroLayout";

/**
 * The homepage of the site, which renders the HeroSection component.
 */
const Home = () => {
  return <MainContent />;
};

export default Home;

Home.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
