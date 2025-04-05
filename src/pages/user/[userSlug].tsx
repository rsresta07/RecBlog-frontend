import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>user {router.query.userSlug}</h1>
    </div>
  );
};

export default UserPage;

UserPage.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
