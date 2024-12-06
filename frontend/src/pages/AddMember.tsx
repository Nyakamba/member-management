import MemberForm from "@/forms/MemberForm";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "@/context/AppContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddMember = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMember,
    onSuccess: () => {
      showToast({ message: "Member added successfully", type: "SUCCESS" });
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

  const handleSave = (memberFormData: FormData) => {
    mutate(memberFormData);
  };

  return (
    <div className="p-8  w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Add Member</h1>
      <MemberForm onSave={handleSave} isLoading={isPending} />
    </div>
  );
};

export default AddMember;
