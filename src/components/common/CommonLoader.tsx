import { Loader } from "@mantine/core";
import commonData from "@/utils/mock/commonData.json";
import Image from "next/image";

// The logo loader when the data is being fetched from API
function CommonLoader({ type }: { type?: string }) {
  return (
    <section className="flex items-center justify-center fixed inset-0 bg-white z-50">
      {type === "pageLoader" ? (
        <div className="h-[60vh] flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <Image
          src={commonData?.projectImage}
          alt={commonData?.projectTitle}
          width={1024}
          height={1024}
          className="h-[16rem] w-[16rem] pl-5 object-contain"
        />
      )}
    </section>
  );
}

export default CommonLoader;
