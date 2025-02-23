import Image from "next/image";
import headerData from "@/utils/mock/headerData.json"
import {useRouter} from "next/router";

const CommonLogo = () => {
  const router = useRouter();
  return (
    <Image
      src={headerData?.logoImage}
      alt={headerData?.logoTitle}
      width={1024}
      height={1024}
      onClick={() => router.push("/")}
      className="h-[2rem] w-auto object-contain"
    />
  )
}

export default CommonLogo;