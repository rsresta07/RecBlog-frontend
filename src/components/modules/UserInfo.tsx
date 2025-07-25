import { Card, Group, Text, Title } from "@mantine/core";
import Link from "next/link";
import { IconAt, IconMapPin, IconPhone } from "@tabler/icons-react";
import CommonLink from "../common/CommonLink";
import EditPreferencesModal from "../modals/EditPreferencesModal";

interface UserInfoProps {
  userData: any;
  isOwner: boolean;
}

/**
 * A component that displays user information.
 *
 * The component will render a card with the user's full name, username, email, and position.
 * If the user is the owner of the profile, it will also display two links: one to edit the profile and one to edit the preferences.
 *
 * @param {object} userData - The user data object containing the user's information
 * @param {boolean} isOwner - A boolean indicating whether the user is the owner of the profile
 * @returns {JSX.Element} A card component with the user information
 */
const UserInfo = ({ userData, isOwner }: UserInfoProps) => {
  if (!userData) return null; // Render nothing if userData is not available

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="mb-[10rem]"
    >
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
