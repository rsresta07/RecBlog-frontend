import { Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";

interface UserInfoProps {
  userData: any;
  isOwner: boolean;
}

const UserInfo = ({ userData, isOwner }: UserInfoProps) => {
  if (!userData) return null; // Render nothing if userData is not available

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8">
      <Group>
        <div className="flex justify-between items-start w-full">
          <div>
            <Title order={2}>{userData?.fullName}</Title>
            <Text size="sm" color="dimmed">
              @{userData?.username}
            </Text>
          </div>
          {isOwner && (
            <Link
              href={`/user/${userData?.username}/edit`}
              className="inline-block mt-2 px-4 py-1 bg-primary-btn text-btn-text rounded-lg"
            >
              Edit profile
            </Link>
          )}
        </div>
      </Group>

      <Group mt="md">
        <Group>
          <IconAt size={16} />
          <Text size="sm">{userData?.email}</Text>
        </Group>
        <Group>
          <IconMapPin size={16} />
          <Text size="sm">{userData?.location}</Text>
        </Group>
        <Group>
          <IconPhone size={16} />
          <Text size="sm">{userData?.contact}</Text>
        </Group>
      </Group>
    </Card>
  );
};

export default UserInfo;
