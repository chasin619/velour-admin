import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuthStore from "@/store/auth";
import { loginSchema } from "./schema";

const useLogin = () => {
  const { login } = useAuthStore();
  const { push } = useRouter();

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (payload: any) => {
    try {
      const user = await login(payload);
      if (user.role === "admin") {
        push("/admin/client");
      } else {
        push("/dashboard/blog");
      }
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    onSubmit,
    form,
  };
};

export default useLogin;
