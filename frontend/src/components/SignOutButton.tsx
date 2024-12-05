import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { Button } from "./ui/button";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({ message: "Sign out success", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <Button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-200"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
