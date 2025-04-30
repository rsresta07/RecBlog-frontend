import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { ApiLogin } from "@/api/auth";
import { setCookie } from "cookies-next";
import { AdminLoginLayout } from "@/layouts/AdminLoginLayout";

interface LoginForm {
  email: string;
  password: string;
}

const AdminLoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await ApiLogin(data);

      if (res?.data?.id) {
        const user = {
          id: res?.data?.id,
          email: res?.data?.email,
          username: res?.data?.username,
          role: res?.data?.role || "ADMIN",
        };
        // Set cookies for token and user
        setCookie("token", res?.data?.token);
        setCookie("user", JSON.stringify(user));

        await router.push("/dashboard");
      } else {
        console.log("Wrong credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center bg-site-bg">
      <div className="w-full max-w-md px-8 py-[10rem]">
        <h1 className="text-2xl font-bold text-center">
          Login To Admin Dashboard
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mt-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextInput
                  type="email"
                  id="username"
                  {...field}
                  className="w-full px-4 py-2 border rounded "
                  placeholder="Enter your username"
                />
              )}
            />
            {errors.email && (
              <div className="text-red-600">{errors.email.message}</div>
            )}
          </div>

          <div className="mt-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextInput
                  type="password"
                  id="password"
                  {...field}
                  className="w-full px-4 py-2 border rounded "
                  placeholder="Enter your password"
                />
              )}
            />
            {errors.password && (
              <div className="text-red-600">{errors.password.message}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
AdminLoginPage.getLayout = (page: any) => (
  <AdminLoginLayout>{page}</AdminLoginLayout>
);
