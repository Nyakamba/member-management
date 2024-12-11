import { CgMoreAlt } from "react-icons/cg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";

import { Link } from "react-router-dom";

interface ViewMoreProps {
  memberId: number;
}

const ViewMore = ({ memberId }: ViewMoreProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => apiClient.deleteMember(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["members"] }),
  });

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      mutate(id);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CgMoreAlt size={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-white border-gray-300 shadow-xl p-2 ">
          <DropdownMenuSeparator />

          <DropdownMenuItem className="bg-white border border-green-400 hover:bg-green-400 rounded-lg">
            <Link to={`/edit-member/${memberId}`} className="px-8">
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="bg-white border border-red-500 rounded-lg hover:bg-red-500 flex items-center">
            <button onClick={() => handleDelete(memberId)} className="px-8">
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

<div></div>;
export default ViewMore;
