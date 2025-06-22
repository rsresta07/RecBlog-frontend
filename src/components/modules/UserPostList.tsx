import { Badge, Grid, Image, Title } from "@mantine/core";
import Link from "next/link";

interface UserPostProps {
  userData: any;
  isOwner: boolean;
}

const UserPostList = ({ userData, isOwner }: UserPostProps) => {
  return (
    <section className="container mx-auto my-12 flex flex-col gap-4">
      <Title order={3} className="mb-4">
        Posts ({userData?.posts?.length})
      </Title>

      <Grid gutter="md">
        {userData?.posts?.map((post: any) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={post.id}>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post?.image}
                    alt={post.title}
                    width={1024}
                    height={1024}
                    className="h-[13rem] w-full object-cover rounded-md"
                  />
                </Link>
                <div className="absolute top-2 right-[-2]">
                  {post?.tags?.map((tag: any) => (
                    <Badge key={tag?.id} variant="light">
                      <span className="text-sm px-2 bg-primary-btn rounded-lg text-btn-text">
                        {tag?.title}
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Link href={`/blog/${post?.slug}`}>
                  <h3 className="text-xl font-semibold line-clamp-1">
                    {post?.title}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                    className="mb-4 line-clamp-2 text-sm text-gray-600"
                  />
                </Link>
              </div>
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </section>
  );
};

export default UserPostList;
