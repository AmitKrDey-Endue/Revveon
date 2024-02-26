import React, { useState } from "react";
import FounderHeader from "../../Shared/DasboardHeader/FounderHeader";
import UserSideBar from "../../Shared/dashboardnavBar/UserSideBar/UserSideBar";
import MenuSideBar from "../../Shared/dashboardnavBar/MenuSideBar/MenuSideBar";
import { ThemeProvider } from "../../Shared/ThemeProvider/ThemeProvider.jsx";

const Wrapper = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handleOpenSidebar = () => {
    setIsOpen(true);
  };

  const name =
    typeof window !== "undefined"
      ? localStorage.getItem("name") ||
        JSON.parse(localStorage.getItem("registrationFormData")).first_name
      : null;

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("email") ||
        JSON.parse(localStorage.getItem("registrationFormData")).email
      : null;
  return (
    <ThemeProvider>
      <div className="relative flex h-screen overflow-clip ps-20">
        <div className="flex grow flex-col overflow-y-auto ">
          <div className="mx-auto w-full max-w-screen-2xl ">
            <div className="flex flex-col gap-24 self-stretch ">
              <div className="flex flex-col gap-12 ">
                <FounderHeader
                  handleOpenSidebar={handleOpenSidebar}
                  email={email}
                  name={name}
                  fixed
                />
                {children}
                <UserSideBar
                  handleCloseSidebar={handleCloseSidebar}
                  isOpen={isOpen}
                  name={name}
                  email={email}
                />
              </div>
            </div>
            <MenuSideBar />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Wrapper;
