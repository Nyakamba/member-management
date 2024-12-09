import NavBar from "@/components/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col m-h-screen ">
      <NavBar />
      <div className=" w-full mx-auto  flex flex-col border  justify-center items-center min-h-screen bg-[#F5F2EB]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
