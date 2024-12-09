import MemberForm from "@/forms/MemberForm";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMember,
    onSuccess: () => {
      showToast({ message: "Member added successfully", type: "SUCCESS" });
      queryClient.invalidateQueries({ queryKey: ["members", "memberStats"] });
      navigate("/dashboard");
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
    <div className="bg-[#F5F2EB]  w-full flex flex-col items-center justify-center p-4 min-h-screen">
      <MemberForm onSave={handleSave} isLoading={isPending} />
    </div>
  );
};

export default AddMember;
