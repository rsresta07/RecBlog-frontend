import { useRouter } from "next/router";
import { useEffect } from "react";

const User = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    router.push("/");
  }, [router.isReady, router]);
};

export default User;
