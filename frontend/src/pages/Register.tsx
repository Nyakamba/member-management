import { useAppContext } from "@/context/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api/apiClient";
import axios from "axios";
import { Button } from "@/components/ui/button";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      showToast({ message: "Registration Success!", type: "SUCCESS" });
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
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5 w-1/2" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

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
      <label className="text-gray-700 text-md font-bold flex-1">
        Confirm Password
        <input
          type="password"
          placeholder="Enter Password"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />{" "}
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between ">
        <span className="text-sm  space-x-1">
          Registered Already?
          <Link className="ml-2 underline" to="/login">
            Login here
          </Link>
        </span>
        <Button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg"
        >
          Register
        </Button>
      </span>
    </form>
  );
};

export default Register;
