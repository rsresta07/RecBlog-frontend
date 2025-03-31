import Image from "next/image";
import headerData from "@/utils/mock/headerData.json";
import { useRouter } from "next/router";
import commonData from "@/utils/mock/commonData.json";
import Link from "next/link";

const CommonLogo = () => {
  const router = useRouter();
  return (
    <Link href="/">
      {/* <Image
        src={headerData?.logoImage}
        alt={headerData?.logoTitle}
        width={1024}
        height={1024}
        onClick={() => router.push("/")}
        className="h-[2rem] w-auto object-contain"
      /> */}
      <h1 className="text-center text-4xl font-bold text-darkFontColor">
        {commonData?.projectTitle}
      </h1>
    </Link>
  );
};

export default CommonLogo;
