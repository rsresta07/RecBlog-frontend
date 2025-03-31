import MainContent from "@/components/modules/HeroSection";
import HomeLayout from "@/layouts/HeroLayout";

const Home = () => {
  return <MainContent />;
};

export default Home;

Home.getLayout = (page: any) => <HomeLayout>{page}</HomeLayout>;
