import { useAppContext } from "@/context/AppContext";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";

const Header = () => {
  const { isLoggedIn, isAdmin } = useAppContext();

  return (
    <div className="bg-green-800  p-4 shadow-lg z-20 sticky top-0 w-full">
      <div className="flex justify-between">
        <div className="text-3xl text-white font-bold tracking-tight">
          <NavLink to={"/members"}>Members</NavLink>
        </div>
        <div className="flex space-x-10">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <NavLink
                  className={({ isActive }) =>
                    ` items-center text-white px-3 font-bold rounded-md hidden sm:flex ${
                      isActive
                        ? "bg-green-600 hover:bg-green-800"
                        : "hover:bg-green-600"
                    }`
                  }
                  to={"/dashboard"}
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) =>
                  ` items-center text-white  px-3 font-bold rounded-md hidden sm:flex ${
                    isActive
                      ? "bg-green-600 hover:bg-green-800"
                      : "hover:bg-green-600"
                  }`
                }
                to={"/members"}
              >
                Members
              </NavLink>
              <SignOutButton />
            </>
          ) : (
            <Button className="hidden sm:flex bg-white text-md  px-3  hover:bg-gray-200">
              <NavLink to={"/sign-in"}>Sign In</NavLink>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
