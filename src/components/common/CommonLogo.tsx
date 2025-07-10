import { useRouter } from "next/router";
import commonData from "@/utils/mock/commonData.json";
import Link from "next/link";

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
