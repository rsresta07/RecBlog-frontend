import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import headerData from "@/utils/mock/headerData.json";
import CommonLogo from "@/components/common/CommonLogo";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { useAuth } from "@/utils/hooks/useAuth";
import { useHotkeys } from "@mantine/hooks";
import { Shortcut } from "@/utils/lib/Shortcut"; // make sure this exists
import {
  Spotlight,
  spotlight,
  type SpotlightActionData,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { ApiGetPost } from "@/api/blog";
import CommonLink from "./CommonLink";

export default function CommonHeader() {
  /* ────────────────────────────── state ─────────────────────────────── */
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [actions, setActions] = useState<SpotlightActionData[]>([]);

  /* ────────────────────────────── auth ──────────────────────────────── */
  const { user, logout } = useAuth();

  /* ───────────────────────────── router ─────────────────────────────── */
  const router = useRouter();

  /* ─────────────────────────── modals ctl ───────────────────────────── */
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  /* ────────────────────── fun Easter-egg rickroll ───────────────────── */
  const rickroll = () =>
    window.open(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "_blank",
      "noopener,noreferrer"
    );

  /* ───────────────────── global keyboard shortcuts ──────────────────── */
  function GlobalHotkeys() {
    useHotkeys([
      ["mod+K", () => spotlight.open()],
      ["mod+shift+alt+X", rickroll],
    ]);
    return null;
  }

  /* ────────────────────── build Spotlight actions ───────────────────── */
  useEffect(() => {
    async function loadData() {
      /* 1. BLOG POSTS (no slice) */
      let postActions: SpotlightActionData[] = [];
      try {
        const { data: posts } = await ApiGetPost(); // grab “all”
        if (Array.isArray(posts)) {
          postActions = posts.map((blog: any) => ({
            id: blog?.id ?? blog?.slug,
            label: blog?.title,
            description:
              (blog?.content?.replace(/<[^>]+>/g, "") ?? "").slice(0, 100) +
              "…",
            keywords: blog?.tags?.map((t: any) => t?.title) ?? [],
            onClick: () => router.push(`/blog/${blog?.slug}`),
            leftSection: (
              <img
                src={blog?.image}
                alt={blog?.title}
                width={75}
                height={75}
                style={{ borderRadius: 4, objectFit: "cover" }}
              />
            ),
          }));
        }
      } catch (e) {
        /* silent fail, keep UX smooth */
        console.error("Couldn’t load blogs for Spotlight", e);
      }

      /* 2. NAV LINKS */
      const navActions: SpotlightActionData[] =
        headerData?.options?.map((item: any) => ({
          id: `nav-${item.id}`,
          label: item.title,
          // description: "Navigate",
          onClick: () => router.push(item.link),
          leftSection: null,
        })) ?? [];

      /* 3. MERGE & SET */
      setActions([...navActions, ...postActions]);
    }

    loadData();
  }, [router]);

  /* ───────────────────────────── render ─────────────────────────────── */
  return (
    <main className="flex justify-between items-center container mx-auto pt-4">
      <CommonLogo />

      {/* ─────────── Spotlight Search ─────────── */}
      <Spotlight
        actions={actions}
        searchProps={{
          leftSection: <IconSearch size={20} stroke={1.5} />,
          placeholder: "Search anything…",
        }}
        nothingFound="Nothing found…"
      >
        <GlobalHotkeys />
        <Shortcut symbol="K" description="Open Spotlight Search" />
        <Shortcut symbol="X" description="Rickroll" />
      </Spotlight>

      {/* ─────────── Nav & Auth ─────────── */}
      <section>
        <ul className="flex items-center gap-12 text-dark-font">
          {user && (
            <CommonLink
              link={`/user/${user?.slug}/add-post`}
              linkLabel="Add Post"
            />
          )}
          {headerData?.options?.map((item: any) => (
            <li key={item.id}>
              <Link href={item?.link} className="text-xl">
                {item?.title}
              </Link>
            </li>
          ))}
          <li>
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-6">
                  <Link
                    href={
                      user.role === "SUPER_ADMIN" // Assuming dashboard also uses slug for consistency
                        ? `/dashboard/${user?.slug}`
                        : `/user/${user?.slug}`
                    }
                  >
                    <span className="cursor-pointer text-xl">Profile</span>
                  </Link>
                  <span className="mx-1">|</span>
                  <button onClick={logout} className="text-xl text-red-600">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <LoginModal openRegisterModal={openRegisterModal} />
                  <span className="mx-1">|</span>
                  <RegisterModal openLoginModal={openLoginModal} />
                </>
              )}
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
