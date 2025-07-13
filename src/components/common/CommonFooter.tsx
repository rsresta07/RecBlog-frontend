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
    <main className="container mx-auto flex justify-between items-center py-4">
      <section>
        <CommonLogo />
      </section>
      <section>
        <Group className={classes.links}>{items}</Group>
      </section>
    </main>
  );
}
