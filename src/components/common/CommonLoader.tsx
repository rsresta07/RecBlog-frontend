import { Loader } from "@mantine/core";
import commonData from "@/utils/mock/commonData.json";

// The logo loader when the data is being fetched from API
function CommonLoader({ type }: { type?: string }) {
  return (
    <section className="flex items-center justify-center fixed inset-0 bg-white z-50">
      {type === "pageLoader" ? (
        <div className="h-[60vh] flex items-center justify-center w-full">
          <Loader />
        </div>
      ) : (
        <h1 className="text-center text-4xl font-bold text-dark-font">
          {commonData?.projectTitleNep}
        </h1>
      )}
    </section>
  );
}

export default CommonLoader;
