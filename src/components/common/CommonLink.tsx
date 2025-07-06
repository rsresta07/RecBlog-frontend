import Link from "next/link";

interface CommonLinkProps {
  link: string;
  linkLabel: string;
}

const CommonLink = ({ link, linkLabel }: CommonLinkProps) => {
  return (
    <Link
      href={link}
      className="px-4 py-2 bg-primary-btn text-btn-text rounded-lg shadow-lg"
    >
      {linkLabel}
    </Link>
  );
};

export default CommonLink;
