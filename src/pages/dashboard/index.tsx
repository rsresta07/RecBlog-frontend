import HeroLayout from "@/layouts/HeroLayout";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();
  return (
    <div>
      <h1>ADMIN {router.query.userSlug}</h1>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.getLayout = (page: any) => <HeroLayout>{page}</HeroLayout>;
