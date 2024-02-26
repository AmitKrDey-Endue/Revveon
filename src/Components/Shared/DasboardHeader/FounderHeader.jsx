import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "../../CMS/Tooltip/Tooltip";

const FounderHeader = ({ handleOpenSidebar, email, name, fixed }) => {
  const firstLetter = name[0];

  return (
    <header className={fixed ? "fixed-header" : ""}>
      <div className=" flex items-center justify-between px-8 pt-4">
        <div className="flex items-center gap-6">
          <Link className="contents" to="/">
            <img
              alt="Revveon"
              src="https://app.revveon.com/revveon-logo-dark.cc182946.svg"
            />
          </Link>
        </div>
        <div className="tooltip">
          <button
            aria-controls="radix-:r4:"
            aria-expanded="false"
            aria-haspopup="dialog"
            data-state="closed"
            type="button"
            onClick={handleOpenSidebar}
            className="relative"
          >
            <div
              className="flex aspect-square w-12 items-center justify-center rounded-full tracking-wide hover:outline hover:outline-2 hover:outline-gray-100 dark:bg-gray-50 dark:hover:outline-gray-50"
              style={{ background: "#6D7788" }}
            >
              {firstLetter}
              <Tooltip
                text={` Account 
          ${email} `}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default FounderHeader;
