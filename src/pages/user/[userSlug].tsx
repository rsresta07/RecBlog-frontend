"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ApiGetUser, ApiGetMe } from "@/api/user";
import { Card, Grid, Group, Image, Text, Title } from "@mantine/core";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";
import HeroLayout from "@/layouts/HeroLayout";

const UserPage = () => {
  const router = useRouter();
  const { userSlug } = router.query as { userSlug?: string };

  const [user, setUser] = useState<any>();
  const [me, setMe] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady || !userSlug) return;

    (async () => {
      try {
        const [profile, current] = await Promise.all([
          ApiGetUser(userSlug),
          ApiGetMe().catch(() => null), // ignore 401/unauth
        ]);
        setUser(profile?.data);
        setMe(current?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, userSlug]);

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (!user) return <p className="text-center mt-10">User not found.</p>;

  const isOwner = me && me.username === user.username;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ────── header ────── */}
      <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8">
        <Group>
          <div>
            <Title order={2}>{user.fullName}</Title>
            <Text size="sm" color="dimmed">
              @{user.username}
            </Text>

            {isOwner && (
              <Link
                href={`/user/${user.username}/edit`}
                className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded"
              >
                Edit profile
              </Link>
            )}
          </div>
        </Group>

        <Group mt="md">
          <Group>
            <IconAt size={16} />
            <Text size="sm">{user.email}</Text>
          </Group>
          <Group>
            <IconMapPin size={16} />
            <Text size="sm">{user.location}</Text>
          </Group>
          <Group>
            <IconPhone size={16} />
            <Text size="sm">{user.contact}</Text>
          </Group>
        </Group>
      </Card>

      {/* ────── posts ────── */}
      <Title order={3} className="mb-4">
        Posts ({user.posts.length})
      </Title>

      <Grid gutter="md">
        {user.posts.map((post: any) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
            <div className="grid grid-rows-2 gap-4">
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1024}
                  height={1024}
                  className="h-[13rem] w-full object-cover rounded-md"
                />
              </Link>

              <div>
                <span className="text-purple-700 text-sm">
                  <Link href={`/user/${user.slug}`}>{user.fullName}</Link>
                </span>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold line-clamp-1">
                    {post.title}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="mb-4 line-clamp-2 text-sm text-gray-600"
                  />
                </Link>

                <div className="flex flex-wrap">
                  {post.tags.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="text-sm px-2 py-1 bg-purple-200 rounded-lg text-purple-700 m-1"
                    >
                      <Link href="#">{tag.title}</Link>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default UserPage;
UserPage.getLayout = (p: any) => <HeroLayout>{p}</HeroLayout>;
