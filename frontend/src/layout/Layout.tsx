import Header from "@/components/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container  mx-auto py-2 flex flex-col justify-center items-center ">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
