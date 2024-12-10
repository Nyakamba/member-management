import NavBar from "@/components/NavBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  flex-col min-h-screen bg-[#F5F2EB]">
      <NavBar />
      <div className=" w-full mx-auto py-2 flex flex-col   justify-center items-center mins-h-screen ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
