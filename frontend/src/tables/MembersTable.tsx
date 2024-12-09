import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { Member } from "@/entities/member";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import avater from "../assets/avater.png";
import ViewMore from "@/components/ViewMore";

const MembersTable = () => {
  const { isAdmin } = useAppContext();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const queryClient = useQueryClient();

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["members", search, page, sortField, sortOrder],
    queryFn: () => apiClient.getMembers(search, page, sortField, sortOrder),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["members", search, page, sortField, sortOrder],
        queryFn: () => apiClient.getMembers(search, page, sortField, sortOrder),
      });
    }
  }, [search, page, sortField, sortOrder, isPlaceholderData, queryClient]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSortChange = (newSortField: string) => {
    setSortField(newSortField);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) return <div>Loading members...</div>;

  return (
    <div className="container  mx-auto py-2 sm:py-0 ">
      {/* Search Input */}
      <div className="flex flex-row    items-center space-x-20 mb-2 ">
        <div className="flex w-full items-center space-x-4 justify-between">
          <div className="relative ">
            <input
              type="text"
              placeholder="Search members"
              value={data?.search}
              onChange={handleSearchChange}
              className="border border-gray-400 focus:outline-none hover:bg-gray-200 transition-colors ease-in delay-100  p-2 pr-10 rounded-full px-4 text-sm focus:bg-white w-full"
            />
            <CiSearch className="absolute right-2 top-2 transform   text-gray-600 h-6 w-6" />
          </div>
          {isAdmin && (
            <Button
              // size={"sm"}
              className="border border-green-400 bg-white  p-2 hover:bg-green-400 text-sm self-end   "
            >
              <Link to="/add-member">Add Member</Link>
            </Button>
          )}
        </div>
      </div>
      {/* Table for Members */}
      <table className=" bg-white border-separate border-spacing-0 w-full  mb-4">
        <thead className="">
          <tr className="bg-gray-200 ">
            <th
              className="border   rounded-tl-md border-gray-300 px-4 py-2 text-left cursor-pointer"
              onClick={() => handleSortChange("name")}
            >
              Name{" "}
              {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 text-left cursor-pointer hidden md:table-cell"
              onClick={() => handleSortChange("email")}
            >
              Email{" "}
              {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left hidden lg:table-cell">
              Date of Birth
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left hidden lg:table-cell ">
              Profile
            </th>
            {isAdmin && (
              <th className="border rounded-tr-lg border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.members.map((member: Member) => (
            <tr key={member.id} className="hover:bg-green-100 ">
              <td className="border rounded-bl-md border-gray-300 px-4 py-2 text-left ">
                {member.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left hidden md:table-cell">
                {member.email}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left hidden lg:table-cell">
                {new Date(member.dob).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {member.role.name}
              </td>
              <td className="border  border-gray-300 px-4 py-2 hidden lg:table-cell text-center">
                <img
                  src={`http://localhost:5000/uploads/${member.profilePicture}`}
                  defaultValue={avater}
                  alt="profile"
                  className="w-10 h-10 object-cover  rounded-full"
                />
              </td>
              {isAdmin && (
                <td className="border rounded-br-md border-gray-300 text-center   py-4 px-1 md:px-0 hover:cursor-pointer">
                  <ViewMore memberId={member.id} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex space-x-10 items-center justify-evenly sm:justify-start">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="border border-green-400 bg-white p-4  hover:bg-green-400 text-md"
        >
          Previous
        </Button>
        <span className="text-md  h-8 w-8 rounded-lg flex justify-center items-center font-bold">
          {page}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= data?.totalPages}
          className="border border-green-400 bg-white p-4  hover:bg-green-400 text-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default MembersTable;
