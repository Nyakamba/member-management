import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col m-h-screen ">
      <Header />
      <div className=" w-full mx-auto  flex flex-col border  justify-center items-center min-h-screen ">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
