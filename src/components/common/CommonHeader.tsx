import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import headerData from "@/utils/mock/headerData.json";
import CommonLogo from "@/components/common/CommonLogo";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { useAuth } from "@/utils/hooks/useAuth";
import { useHotkeys } from "@mantine/hooks";
import { Shortcut } from "@/utils/lib/Shortcut";
import {
  Spotlight,
  spotlight,
  type SpotlightActionData,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { ApiGetPost } from "@/api/blog";
import CommonLink from "./CommonLink";
import { Button, TextInput } from "@mantine/core";

export default function CommonHeader() {
  // State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [actions, setActions] = useState<SpotlightActionData[]>([]);

  // auth
  const { user, logout } = useAuth();

  // router
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // modals ctl
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  // TODO: remove this
  // fun Easter-egg rickroll
  const rickroll = () =>
    window.open(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "_blank",
      "noopener,noreferrer"
    );

  // global hotkeys
  function GlobalHotkeys() {
    useHotkeys([
      ["mod+K", () => spotlight.open()],
      ["mod+shift+alt+X", rickroll],
    ]);
    return null;
  }

  // build spotlight actions
  useEffect(() => {
    async function loadData() {
      // Blog posts (no slice)
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

  return (
    <main className="bg-light-bg">
      <section className="container mx-auto flex justify-between items-center pt-4 bg-light-bg">
        <CommonLogo />

        <div className="md:hidden">
          <button
            aria-label="Search"
            onClick={() => spotlight.open()}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <IconSearch size={22} stroke={1.5} />
          </button>
        </div>
        <div className="hidden md:flex w-[20rem]">
          <TextInput
            placeholder="Search…"
            readOnly
            onClick={() => spotlight.open()}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            className="w-[20rem] bg-light-bg"
            radius="lg"
          />
        </div>

        <Spotlight
          actions={actions}
          searchProps={{
            leftSection: <IconSearch size={20} stroke={1.5} />,
            placeholder: "Search anything…",
          }}
          nothingFound="Nothing found…"
          className="bg-light-bg"
        >
          <GlobalHotkeys />
          <Shortcut symbol="K" description="Open Spotlight Search" />
          <Shortcut symbol="X" description="Rickroll" />
        </Spotlight>

        {/* nav & auth */}
        <section>
          <ul className="flex items-center gap-12 text-dark-font">
            {user && (
              <Link
                href={`/user/${user?.slug}/add-post`}
                className="px-4 py-2 bg-accent text-light-text rounded-lg shadow-lg shadow-[#A65418] hover:bg-[#A65418] transition-colors duration-300"
              >
                Add Post
              </Link>
            )}
            {headerData?.options?.map((item: any) => (
              <li key={item.id}>
                <Link
                  href={item?.link}
                  className="text-xl text-primary hover:underline decoration-secondary decoration-4 underline-offset-4 transition-all duration-300"
                >
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
                      className="text-xl text-primary hover:underline decoration-secondary decoration-4 underline-offset-4 transition-all duration-300"
                    >
                      Profile
                    </Link>
                    <span className="mx-1">|</span>
                    <button
                      onClick={logout}
                      className="text-xl text-red-600 hover:underline decoration-red-800 decoration-4 underline-offset-4 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => setShowLoginModal(true)}
                      variant="transparent"
                      color="black"
                      size="compact-xl"
                    >
                      <label className="font-normal text-primary hover:underline decoration-secondary decoration-4 underline-offset-4 transition-all duration-300">
                        Sign In
                      </label>
                    </Button>
                    <LoginModal
                      openRegisterModal={() => {}}
                      triggerOpen={showLoginModal}
                      setTriggerOpen={setShowLoginModal}
                    />

                    <span className="mx-1">|</span>

                    <RegisterModal openLoginModal={openLoginModal} />
                  </>
                )}
              </div>
            </li>
          </ul>
        </section>
      </section>
    </main>
  );
}
