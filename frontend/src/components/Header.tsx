import { useAppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";

//import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Members management</Link>
        </span>
        <span
          className="flex space-x-2
        "
        >
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={"/dashboard"}
              >
                Dashboard
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to={"/members"}
              >
                Members
              </Link>
              <p>Log out</p>
              {/* <SignOutButton /> */}
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
