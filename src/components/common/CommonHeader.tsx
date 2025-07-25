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
import { Button, TextInput } from "@mantine/core";

/**
 * CommonHeader component renders the main header of the application.
 * It includes logo, navigation links, search functionality, and user authentication modals.
 *
 * Features:
 * - Displays the application logo.
 * - Provides search functionality with Spotlight integration.
 * - Includes navigation links fetched from headerData.
 * - Allows users to sign in, register, or logout.
 * - Handles global hotkeys for spotlight and a hidden rickroll feature.
 * - Dynamically loads blog post data to populate Spotlight actions.
 *
 * State:
 * - isRegisterModalOpen: Controls the visibility of the registration modal.
 * - isLoginModalOpen: Controls the visibility of the login modal.
 * - actions: Stores Spotlight action data for navigation.
 * - showLoginModal: Controls the visibility of the login modal.
 * - searchQuery: Stores the current search input for filtering actions.
 *
 * Hooks:
 * - Uses useAuth to manage user authentication state.
 * - Uses useRouter for navigation.
 * - Uses useEffect to load blog post data on component mount.
 */
export default function CommonHeader() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [actions, setActions] = useState<SpotlightActionData[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();
  const router = useRouter();

  /**
   * Toggles the visibility of the registration modal to true,
   * and the login modal to false.
   */
  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  /**
   * Toggles the visibility of the login modal to true,
   * and the registration modal to false.
   */
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  /**
   * Opens a new window to Rick Astley's "Never Gonna Give You Up".
   * Used as a hidden feature with the hotkey "mod+shift+alt+X".
   */
  const rickroll = () =>
    window.open(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "_blank",
      "noopener,noreferrer"
    );

  /**
   * Defines global hotkeys for the application.
   *
   * - "mod+K" to open the Spotlight search.
   * - "mod+shift+alt+X" to open a Rick Astley video in a new window as a hidden feature.
   *
   * @returns {null}
   */
  function GlobalHotkeys() {
    useHotkeys([
      ["mod+K", () => spotlight.open()],
      ["mod+shift+alt+X", rickroll],
    ]);
    return null;
  }

  /**
   * Fetches the list of blog posts from the server and populates the
   * Spotlight search with the post titles.
   *
   * @returns {Promise<void>}
   */
  async function loadData() {
    const { data: blogPosts } = await ApiGetPost();

    const actions: SpotlightActionData[] = blogPosts?.map((post: any) => ({
      id: post.id,
      label: post.title,
      onClick: () => router.push(`/blog/${post.slug}`), // actually navigate

      /**
       * Renders a single search result item as a clickable card.
       * The card contains a thumbnail image, the post title, and a truncated
       * version of the post content.
       *
       * @param {object} post - Blog post data.
       * @returns {ReactElement} A clickable card element.
       */
      component: () => (
        <div
          onClick={() => router.push(`/blog/${post.slug}`)}
          className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded cursor-pointer"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-12 h-12 object-cover rounded"
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">{post.title}</span>
            <span className="text-xs text-gray-500 line-clamp-2">
              {post.content
                ?.replace(/<[^>]+>/g, "")
                .slice(0, 100)
                .trim() + "…"}
            </span>
          </div>
        </div>
      ),
    }));

    setActions(actions); // ← ✅ this was missing!
  }

  useEffect(() => {
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
            placeholder="Search (Ctrl + K)"
            readOnly
            onClick={() => spotlight.open()}
            leftSection={<IconSearch size={18} stroke={1.5} />}
            className="w-[20rem] bg-light-bg"
            radius="lg"
          />
        </div>

        <Spotlight
          actions={
            searchQuery.trim()
              ? actions.filter((action) =>
                  action?.label
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
              : []
          }
          searchProps={{
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.currentTarget.value),
            leftSection: <IconSearch size={20} stroke={1.5} />,
            placeholder: "Search anything…",
          }}
          nothingFound="Nothing found..."
          highlightQuery
          className="bg-light-bg"
        >
          <GlobalHotkeys />
          <Shortcut symbol="K" description="Open Spotlight Search" />
          <Shortcut symbol="X" description="Rickroll" />
        </Spotlight>

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
                        user.role === "SUPER_ADMIN"
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
                      openRegisterModal={openRegisterModal}
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
