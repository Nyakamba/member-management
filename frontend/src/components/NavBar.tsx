import { useAppContext } from "@/context/AppContext";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const { isLoggedIn, isAdmin } = useAppContext();

  return (
    <div className="bg-green-500 flex justify-between items-center  p-4 shadow-lg z-20 sticky top-0 w-full">
      <div className="flex justify-between w-full">
        <div className="text-3xl text-white font-bold tracking-tight">
          <NavLink to={"/members"}>Members</NavLink>
        </div>
        <div className="flex space-x-10 ">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <NavLink
                  className={({ isActive }) =>
                    ` items-center text-white px-3 font-bold rounded-md hidden sm:flex ${
                      isActive
                        ? "bg-green-300 hover:bg-green-s"
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
                  ` items-center text-white  px-3 font-bold rounded-md hidden  sm:flex ${
                    isActive
                      ? "bg-green-300 hover:bg-gre"
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
            <Button className="hidden sm:flex bg-white text-xs  px-3  hover:bg-gray-200">
              <NavLink to={"/sign-in"}>Sign In</NavLink>
            </Button>
          )}
        </div>
      </div>{" "}
      <MobileNavBar />
    </div>
  );
};

export default NavBar;
