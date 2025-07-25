import { Html, Head, Main, NextScript } from "next/document";

/**
 * The Next.js Document component, which is used to define the markup structure
 * of the HTML page.
 *
 * The component should include the `<Html>`, `<Head>`, `<Main>`, and
 * `<NextScript>` components in that order.
 *
 * The `lang` prop on the `<Html>` component is set to "en" as this is an English
 * language website.
 *
 * The `<body>` component is given the "antialiased" class to turn off font
 * aliasing.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
