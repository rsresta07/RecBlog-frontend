import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiGetMe, ApiGetPreferences, ApiGetUser } from "@/api/user";
import HeroLayout from "@/layouts/HeroLayout";
import UserInfo from "@/components/modules/UserInfo";
import UserPostList from "@/components/modules/UserPostList";
import CommonButton from "@/components/common/CommonButton";
import CommonLink from "@/components/common/CommonLink";

const UserPage = () => {
  const router = useRouter();
  const { userSlug } = router.query as { userSlug?: string };

  const [user, setUser] = useState<any>();
  const [me, setMe] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [hasPreferences, setHasPreferences] = useState<boolean | null>(null); // ← NEW

  const userData = user?.data;

  useEffect(() => {
    if (!router.isReady || !userSlug) return;

    (async () => {
      try {
        // get profile + “me”
        const [profile, current] = await Promise.all([
          ApiGetUser(userSlug),
          ApiGetMe().catch(() => null), // ignore 401/unauth
        ]);

        setUser(profile);
        setMe(current);

        // if I’m the owner, fetch my preferences count
        if (current && current.data?.username === profile.data?.username) {
          const { data: prefs } = await ApiGetPreferences().catch(() => ({
            data: [],
          }));
          setHasPreferences(prefs.length > 0);
        } else {
          setHasPreferences(true); // someone else’s page → don’t show button
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, userSlug]);

  if (loading || hasPreferences === null)
    return <p className="text-center mt-10">Loading…</p>;

  if (!userData) return <p className="text-center mt-10">User not found.</p>;

  const isOwner = me && me.data?.username === userData?.username;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ────── header ────── */}
      <UserInfo userData={userData} isOwner={isOwner} />

      {/* ────── add‑preferences button ────── */}
      {isOwner && !hasPreferences && (
        <div className="my-8 flex justify-center">
          <CommonLink
            linkLabel="Add Preferences"
            link={`/user/${userSlug}/preferences`}
          />
        </div>
      )}

      {/* ────── posts ────── */}
      <UserPostList userData={userData} isOwner={isOwner} />
    </div>
  );
};

export default UserPage;
UserPage.getLayout = (p: any) => <HeroLayout>{p}</HeroLayout>;
