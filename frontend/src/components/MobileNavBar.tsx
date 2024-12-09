import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaBars } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api/apiClient";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const MobileNavBar = () => {
  const { isLoggedIn, isAdmin } = useAppContext();
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
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <FaBars className="text-white" />
        </SheetTrigger>
        <SheetContent className="bg-green-500 flex flex-col items-center justify-center text-center">
          {isLoggedIn ? (
            <div className="flex flex-col gap-20  w-full">
              {isAdmin && (
                <NavLink
                  className={({ isActive }) =>
                    ` items-center text-white p-3 px-4 font-bold rounded-lg text-lg ${
                      isActive
                        ? "bg-green-300 hover:bg-green-s"
                        : "hover:bg-green-600"
                    }`
                  }
                  to={"/dashboard"}
                >
                  <SheetClose>Dashboard</SheetClose>
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) =>
                  ` items-center text-white  p-3 px-4 font-bold rounded-lg text-lg ${
                    isActive
                      ? "bg-green-300 hover:bg-gre"
                      : "hover:bg-green-600"
                  }`
                }
                to={"/members"}
              >
                <SheetClose>Members</SheetClose>
              </NavLink>
              <Button
                onClick={handleClick}
                className="text-black-600  p-3 px-4 bg-white hover:bg-gray-200 text-sm "
              >
                <SheetClose>Sign Out</SheetClose>
              </Button>
            </div>
          ) : (
            <Button className=" bg-white text-xs  px-3  hover:bg-gray-200">
              <SheetClose>Sign In</SheetClose>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavBar;
