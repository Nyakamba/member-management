import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api/apiClient";
import image from "../assets/image.png";
import socials from "../assets/socials.png";

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
    <div className="flex flex-col sm:flex-row justify-center sm:space-x-16  lg:space-x-52 items-center p-4 lg:p-14 w-full min-h-screen bg-[#F5F2EB]">
      <img
        src={image}
        alt="image"
        className="w-[60%] sm:w-[40%]  lg:w-[28%]  object-cover "
      />

      <form
        className="flex  flex-col gap-5  sm:w-[40%] lg:w-[28%] bg-white rounded-xl shadow p-8 sm:p-10"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center">Sign In</h2>
        <p className="text-center text-gray-700 font-medium">
          Hey, Enter your details to log into your account
        </p>
        <label className="text-gray-700 text-md  flex-1">
          Email
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-400 rounded-lg w-full py-2 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-md flex-1">
          Password
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-gray-400 rounded-lg w-full py-2 px-2 font-normal"
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
        <div className="flex flex-col gap-6  ">
          <span className="text-xs text-gray-500">
            Do not have an account ?
            <Link
              className="ml-2 underline font-bold text-black"
              to="/register"
            >
              Sign Up Now
            </Link>
          </span>
          <Button
            type="submit"
            className="bg-green-400 text-white p-2 font-bold hover:bg-green-300 text-lg"
          >
            Sign In
          </Button>

          <p className="text-center text-sm ">Or sign in with</p>
          <img src={socials} />

          <span className="text-xs text-gray-500">
            Do not have an account ?
            <Link
              className="ml-2 underline font-bold text-black"
              to="/register"
            >
              Sign Up Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
