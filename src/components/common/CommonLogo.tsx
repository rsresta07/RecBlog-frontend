import { useRouter } from "next/router";
import commonData from "@/utils/mock/commonData.json";
import Link from "next/link";

/**
 * CommonLogo component renders the logo of the application.
 *
 * It is a centered `h1` tag with the project title in a smaller font size.
 * The logo is a link back to the homepage.
 *
 * @returns The CommonLogo component.
 */
const CommonLogo = () => {
  const router = useRouter();
  return (
    <Link href="/">
      <h1 className="text-center text-4xl font-bold text-primary">
        {commonData?.projectTitleSmall}
      </h1>
    </Link>
  );
};

export default CommonLogo;
