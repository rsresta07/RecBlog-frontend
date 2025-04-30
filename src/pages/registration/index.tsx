import Link from "next/link";

const Login = () => {
  return (
    <main className={`container mx-auto mt-12 grid gap-12 text-center`}>
      <p>Currently the idiot creator has not added this page!</p>
      <p>
        <Link href="/login" className={"text-blue-950 underline"}>
          Go to this page!
        </Link>
      </p>
    </main>
  );
};

export default Login;
