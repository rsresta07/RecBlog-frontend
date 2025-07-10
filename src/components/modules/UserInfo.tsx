import { Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";
import CommonLink from "../common/CommonLink";
import EditPreferencesModal from "../modals/EditPreferencesModal";

interface UserInfoProps {
  userData: any;
  isOwner: boolean;
}

const UserInfo = ({ userData, isOwner }: UserInfoProps) => {
  if (!userData) return null; // Render nothing if userData is not available

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mb-8">
      <section className="flex justify-between items-start w-full">
        <section>
          <div className="flex gap-4 items-center">
            <Title order={2}>{userData?.fullName}</Title>
            <Text size="sm" color="dimmed">
              @{userData?.username}
            </Text>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <IconAt size={16} />
              <Text size="sm">{userData?.email}</Text>
            </div>
            <div className="flex items-center gap-1">
              <IconPhone size={16} />
              <Text size="sm">{userData?.position}</Text>
            </div>
          </div>
        </section>
        {isOwner && (
          <div className="flex flex-col gap-4">
            <CommonLink
              link={`/user/${userData?.username}/edit-profile`}
              linkLabel="Edit profile"
            />
            <>
              <EditPreferencesModal />
            </>
          </div>
        )}
      </section>
    </Card>
  );
};

export default UserInfo;
