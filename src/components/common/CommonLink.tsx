import Link from "next/link";

interface CommonLinkProps {
  link: string;
  linkLabel: string;
}

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
