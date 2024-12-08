import { useAppContext } from "@/context/AppContext";
import MemberForm from "@/forms/MemberForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api/apiClient";

const EditMember = () => {
  const { memberId } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const { data: member } = useQuery({
    queryKey: ["getmemberById", memberId],
    queryFn: () => apiClient.getMemberById(memberId!),
    enabled: !!memberId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      apiClient.editMember(memberId!, formData),
    onSuccess: () => {
      showToast({ message: "Meber Saved!", type: "SUCCESS" });
      queryClient.invalidateQueries({ queryKey: ["members", "memberStats"] });
      navigate("/dashboard");
    },
    onError: () => {
      showToast({ message: "Error Saving Member", type: "ERROR" });
    },
  });

  const handleSave = (memberFormData: FormData) => {
    mutate(memberFormData);
  };

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8  w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Edit Member</h1>
      <MemberForm
        member={member.member}
        onSave={handleSave}
        isLoading={isPending}
      />
    </div>
  );
};

export default EditMember;
