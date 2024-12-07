import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

export type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { mutate } = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      showToast({ message: "Sign in Success", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/members");
    },

    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        showToast({ message: error.response.data.message, type: "ERROR" });
      } else {
        showToast({
          message: "An unexpected error occurred.",
          type: "ERROR",
        });
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 w-[50%]" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Login</h2>
      <label className="text-gray-700 text-md font-bold flex-1">
        Email
        <input
          type="email"
          placeholder="Enter email"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-md font-bold flex-1">
        Password
        <input
          type="password"
          placeholder="Enter Password"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 5,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between ">
        <span className="text-sm">
          Not Registered?
          <Link className="ml-2 underline" to="/register">
            Create account here
          </Link>
        </span>
        <Button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg"
        >
          Login
        </Button>
      </span>
    </form>
  );
};

export default Login;
