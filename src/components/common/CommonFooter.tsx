import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
import classes from "@/styles/FooterCentered.module.css";
import CommonLogo from "./CommonLogo";
import Link from "next/link";

const links = [{ link: "/blog", label: "Blog" }];

export default function CommonFooter() {
  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      href={link.link}
      c="dimmed"
      size="sm"
      lh={1}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <CommonLogo />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
