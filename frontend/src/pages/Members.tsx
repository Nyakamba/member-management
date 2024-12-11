import { Link } from "react-router-dom";
import aviation from "../assets/avation-4823907_640.jpg";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const Members = () => {
  const { isAdmin } = useAppContext();
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["members"],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getMembers({
        page: pageParam,
        limit: 8,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

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

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading members</div>;

  const members = data?.pages.flatMap((page) => page.members);
  console.log(members);

  return (
    <div className="w-full flex flex-col container mx-auto items-center justify-center space-y-2">
      <div className="px-4 sm:px-16  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  justify-items-center ">
        {members?.map((member) => (
          <div
            key={member.id}
            className="w-full h-[50x] sm:w-[70%] bg-white border border-gray-200 rounded-lg shadow-lg hover:scale-105 hover-shadow-lg p-4 transition-transform duration-300"
          >
            <img
              className="rounded-lg  object-cover border h-[300px] w-full"
              src={
                member.profilePicture !== null
                  ? `http://localhost:5000/uploads/${member.profilePicture}`
                  : `${aviation}`
              }
              alt="Profile Photo"
            />

            <div className="p-5">
              <div className="flex justify-between items-center">
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                  {member.name}
                </h5>
                <p className="text-sm bg-gray-200 p-1 px-2 rounded-md text-gray-900 capitalize">
                  {member.role.name}
                </p>
              </div>
            </div>
            {isAdmin && (
              <div className="flex justify-between gap-2 px-10 ">
                <Button className="bg-white border border-green-400 hover:bg-green-400 rounded-lg">
                  <Link to={`/edit-member/${member.id}`} className="px-8">
                    Edit
                  </Link>
                </Button>

                <Button className="bg-white border border-red-500 rounded-lg hover:bg-red-500 flex items-center">
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-6"
                  >
                    Delete
                  </button>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600  self-center"
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load More"
          : "No More Members"}
      </button>
    </div>
  );
};

export default Members;
