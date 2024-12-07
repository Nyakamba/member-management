import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api/apiClient";
import { useEffect } from "react";

type MemberFormData = {
  name: string;
  email: string;
  dob: string;
  roleId: number;
  profilePicture?: FileList;
};

type Props = {
  memberId?: string;
  onSave: (memberFormData: FormData) => void;
  isLoading: boolean;
};

const MemberForm = ({ memberId, onSave, isLoading }: Props) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<MemberFormData>();

  const { data: member } = useQuery({
    queryKey: ["getmemberById", memberId],
    queryFn: () => apiClient.getMemberById(memberId!),
    enabled: !!memberId,
  });

  useEffect(() => {
    if (member) {
      reset(member);
    }
  }, [member, reset]);

  const onSubmit = handleSubmit((data: MemberFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    formData.append("roleId", data.roleId.toString());

    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    onSave(formData);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4 w-[60%]">
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="border rounded w-full py-2 px-2 font-normal"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className="border rounded w-full py-2 px-2 font-normal"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Date of Birth
        <input
          type="date"
          {...register("dob", { required: "Date of Birth is required" })}
          className="border rounded w-full py-2 px-2 font-normal cursor-pointer"
        />
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Select Role
        <select
          {...register("roleId", { required: "Role is required" })}
          className="border rounded w-full py-2 px-2 font-normal cursor-pointer"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="2">Admin</option>
          <option value="1">User</option>
        </select>
        {errors.roleId && (
          <p className="text-red-500">{errors.roleId.message}</p>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        <input
          type="file"
          {...register("profilePicture")}
          className="border rounded w-full py-2 px-2 font-normal cursor-pointer"
        />
      </label>

      <Button
        type="submit"
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg self-end"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : member ? "Update Member" : "Add Member"}
      </Button>
    </form>
  );
};

export default MemberForm;