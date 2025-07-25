import { Anchor, Group } from "@mantine/core";
import CommonLogo from "./CommonLogo";
import Link from "next/link";

const links = [{ link: "/blog", label: "Blog" }];

/**
 * CommonFooter component renders a footer with a centered layout,
 * containing a CommonLogo and a list of links.
 *
 * @example
 * <CommonFooter />
 */
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
    </main>
  );
}
