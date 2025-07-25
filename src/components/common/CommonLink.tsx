import Link from "next/link";

interface CommonLinkProps {
  link: string;
  linkLabel: string;
}

/**
 * A Next.js Link component with a default set of styles.
 *
 * The styles applied are:
 * - `px-4` and `py-2` for padding
 * - `bg-primary` for the background color
 * - `text-[#fefefe]` for the text color
 * - `rounded-lg` for a rounded box with a large border radius
 * - `shadow-lg` for a large drop shadow
 * - `shadow-secondary` for the shadow color
 * - `hover:bg-secondary` to change the background color to `secondary-color` on hover
 * - `transition-colors duration-300` to animate the color change
 *
 * The default properties are:
 * - `href` the link URL
 * - `className` the class name for the link element
 *
 * @param link The link URL
 * @param linkLabel The text to display for the link
 */
const CommonLink = ({ link, linkLabel }: CommonLinkProps) => {
  return (
    <Link
      href={link}
      className="px-4 py-2 bg-primary text-[#fefefe] rounded-lg shadow-lg shadow-secondary hover:bg-secondary transition-colors duration-300"
    >
      {linkLabel}
    </Link>
  );
};

export default CommonLink;
