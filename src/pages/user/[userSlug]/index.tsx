import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiGetMe, ApiGetUser } from "@/api/user";
import HeroLayout from "@/layouts/HeroLayout";
import UserInfo from "@/components/modules/UserInfo";
import UserPostList from "@/components/modules/UserPostList";

const UserPage = () => {
  const router = useRouter();
  const { userSlug } = router.query as { userSlug?: string };

  const [user, setUser] = useState<any>();
  const [me, setMe] = useState<any>();
  const [loading, setLoading] = useState(true);

  const userData = user?.data;

  useEffect(() => {
    if (!router.isReady || !userSlug) return;

    (async () => {
      try {
        const [profile, current] = await Promise.all([
          ApiGetUser(userSlug),
          ApiGetMe().catch(() => null), // ignore 401/unauth
        ]);
        setUser(profile);
        setMe(current);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, userSlug]);

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (!userData) return <p className="text-center mt-10">User not found.</p>;

  const isOwner = me && me?.data?.username === userData?.username;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ────── header ────── */}
      <UserInfo userData={userData} isOwner={isOwner} />

      {/* ────── posts ────── */}
      <UserPostList userData={userData} isOwner={isOwner} />
    </div>
  );
};

export default UserPage;
UserPage.getLayout = (p: any) => <HeroLayout>{p}</HeroLayout>;
