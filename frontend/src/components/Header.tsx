import { useAppContext } from "@/context/AppContext";
import { NavLink } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";

const Header = () => {
  const { isLoggedIn, isAdmin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6 sticky top-0">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <NavLink to={"/members"}>Members Management</NavLink>
        </span>
        <span className="flex space-x-10">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center text-white px-3 font-bold rounded-md ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-800"
                        : "hover:bg-blue-600"
                    }`
                  }
                  to={"/dashboard"}
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                className={({ isActive }) =>
                  `flex items-center text-white px-3 font-bold rounded-md ${
                    isActive
                      ? "bg-blue-600 hover:bg-blue-800"
                      : "hover:bg-blue-600"
                  }`
                }
                to={"/members"}
              >
                Members
              </NavLink>
              <SignOutButton />
            </>
          ) : (
            <Button className="flex items-center bg-white text-lg text-blue-600 px-4 font-bold hover:bg-gray-200">
              <NavLink to={"/sign-in"}>Login</NavLink>
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
