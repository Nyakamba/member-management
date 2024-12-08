import { Button } from "@/components/ui/button";
import { Member } from "@/entities/member";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type MemberFormData = {
  name: string;
  email: string;
  dob: string;
  roleId: number;
  profilePicture?: FileList | string;
};

type Props = {
  member?: Member;
  onSave: (memberFormData: FormData) => void;
  isLoading: boolean;
};

const MemberForm = ({ member, onSave, isLoading }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm<MemberFormData>();

  const profilePicture = watch("profilePicture");

  useEffect(() => {
    console.log(member?.profilePicture);
    reset({
      name: member?.name,
      email: member?.email,
      dob: member?.dob.split("T")[0],
      roleId: member?.roleId,
      profilePicture: member?.profilePicture,
    });

    setPreview(member?.profilePicture || null);
  }, [member, reset]);

  const onSubmit = handleSubmit((data: MemberFormData) => {
    console.log(data);
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("dob", data.dob.split("T")[0]);
    formData.append("roleId", data.roleId.toString());

    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture[0]);
    }

    onSave(formData);
  });

  useEffect(() => {
    if (profilePicture && profilePicture.length > 0) {
      const file = profilePicture[0];
      if (file instanceof Blob) {
        const objectURL = URL.createObjectURL(file);
        setPreview(objectURL);

        return () => URL.revokeObjectURL(objectURL);
      }
    } else {
      setPreview(null);
    }
  }, [profilePicture]);

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
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
        {errors.roleId && (
          <p className="text-red-500">{errors.roleId.message}</p>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Profile Picture
        <input
          type="file"
          {...register("profilePicture")}
          className="border rounded w-full py-2 px-2 font-normal cursor-pointer"
        />
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}
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
