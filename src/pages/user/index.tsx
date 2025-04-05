import { useRouter } from "next/router";
import { useEffect } from "react";

const User = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
};

export default User;
