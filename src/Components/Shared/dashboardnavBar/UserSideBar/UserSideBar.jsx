import React, { useState } from "react";
import { logout } from "../../../../redux/features/auth/authSlice";

import Tooltip from "../../../CMS/Tooltip/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "../../ThemeProvider/ThemeProvider.jsx";

const UserSideBar = ({ handleCloseSidebar, email, isOpen, name }) => {
  const { theme, toggleTheme } = useTheme();

  const handleToggleSystemDefault = () => {
    localStorage.removeItem("theme");
    document.documentElement.removeAttribute("data-theme");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/user/sign-in");
  };

  const firstLetter = name[0];

  return (
    <div>
      {" "}
      <div
        className={`fixed right-0 top-0  flex h-full flex-col animate-slide-right ${
          isOpen ? "block" : "hidden"
        }`}
        aria-describedby="radix-:r6:"
        aria-labelledby="radix-:r5:"
        data-state="open"
        id="radix-:r4:"
        role="dialog"
        tabIndex="-1"
      >
        <div
          className="flex min-h-0 max-w-xs flex-1 flex-col border-l border-gray-100 dark:border-gray-50 "
          style={{ backgroundColor: "hsl(228 19% 31%)" }}
        >
          <div className="flex items-center justify-between gap-12 px-8 py-6">
            <div
              dir="ltr"
              role="group"
              style={{
                outline: "none",
              }}
              tabIndex="0"
            >
              <input
                className="peer hidden"
                defaultValue="system"
                type="text"
              />
              <div className="flex rounded-sm bg-red outline-1 -outline-offset-1 outline-red-50 peer-data-[invalid]:outline dark:bg-gray-24 dark:outline-yellow-57 ">
                <button
                  aria-checked={theme === "dark"}
                  className={`hover:bg-shade flex grow items-center justify-center border border-gray-80 bg-primary bg-opacity-0 dark:border-gray-42 first:rounded-s-sm last:rounded-e-sm [&:not(:first-child)]:-ml-[1px] ${
                    theme === "dark"
                      ? "aria-checked:border-b-primary aria-checked:bg-opacity-5 aria-checked:text-primary dark:aria-checked:border-b-primary"
                      : ""
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-62`}
                  data-radix-collection-item=""
                  data-state="on"
                  role="radio"
                  tabIndex="-1"
                  type="button"
                  onClick={toggleTheme}
                >
                  <div className="px-3 py-2" data-state="closed">
                    <svg
                      aria-hidden="true"
                      className="svg-inline--fa fa-moon fa-fw "
                      data-icon="moon"
                      data-prefix="fasl"
                      focusable="false"
                      role="img"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M287.6 41.2c-19.7-5.8-40.6-9-62.2-9.2c-.5 0-1 0-1.5 0C100.3 32 0 132.3 0 256S100.3 480 224 480c40 0 77.5-10.5 110-28.8c.4-.2 .8-.5 1.2-.7c17.9-10.3 34.3-22.9 48.6-37.6c-15.5 4.1-31.8 6.2-48.6 6.2c-3.2 0-6.4-.1-9.6-.2c-101.3-5-181.9-89-181.9-191.8c0-68.7 36-129 90.2-163c16.4-10.3 34.5-18.1 53.8-23.1zM175.9 70.1c-39.7 40.4-64.2 95.9-64.2 157.1c0 101.6 67.5 187.4 160 214.8c-15.2 3.9-31.2 6-47.7 6C118 448 32 362 32 256C32 166.6 93.1 91.4 175.9 70.1z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  aria-checked={theme === "system"}
                  className={`hover:bg-shade flex grow items-center justify-center border border-gray-100 bg-primary bg-opacity-0 dark:border-gray-42 first:rounded-s-sm last:rounded-e-sm [&:not(:first-child)]:-ml-[1px] ${
                    theme === "system"
                      ? "aria-checked:border-b-primary aria-checked:bg-opacity-5 aria-checked:text-primary dark:aria-checked:border-b-primary"
                      : ""
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-62`}
                  data-radix-collection-item=""
                  data-state="on"
                  role="radio"
                  tabIndex="-1"
                  type="button"
                  onClick={handleToggleSystemDefault}
                >
                  <div className="px-2 py-3" data-state="closed">
                    <svg
                      aria-hidden="true"
                      className="svg-inline--fa fa-circle-half-stroke fa-fw "
                      data-icon="circle-half-stroke"
                      data-prefix="fasl"
                      focusable="false"
                      role="img"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M240 479.4V32.6C123.8 40.8 32 137.7 32 256s91.8 215.2 208 223.4zM480 256c0-118.3-91.8-215.2-208-223.4V479.4C388.2 471.2 480 374.3 480 256zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <Tooltip text={"System theme"} />
                </button>
                <button
                  aria-checked={theme === "light"}
                  className={`hover:bg-shade flex grow items-center justify-center border border-gray-80 bg-primary bg-opacity-0 dark:border-gray-42 first:rounded-s-sm last:rounded-e-sm [&:not(:first-child)]:-ml-[1px] ${
                    theme === "light"
                      ? "aria-checked:border-b-primary aria-checked:bg-opacity-5 aria-checked:text-primary dark:aria-checked:border-b-primary"
                      : ""
                  } focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-62`}
                  data-radix-collection-item=""
                  data-state="off"
                  role="radio"
                  tabIndex="-1"
                  type="button"
                  onClick={toggleTheme}
                >
                  <div className="px-3 py-2" data-state="closed">
                    <svg
                      aria-hidden="true"
                      className="svg-inline--fa fa-sun-bright fa-fw "
                      data-icon="sun-bright"
                      data-prefix="fasl"
                      focusable="false"
                      role="img"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M272 0V16 96v16H240V96 16 0h32zM0 240H16 96h16v32H96 16 0V240zm400 0h16 80 16v32H496 416 400V240zM272 400v16 80 16H240V496 416 400h32zM86.3 63.7L97.6 75l56.6 56.6 11.3 11.3-22.6 22.6-11.3-11.3L75 97.6 63.7 86.3 86.3 63.7zm-22.6 362L75 414.4l56.6-56.6 11.3-11.3 22.6 22.6-11.3 11.3L97.6 437 86.3 448.3 63.7 425.7zM346.5 142.9l11.3-11.3L414.4 75l11.3-11.3 22.6 22.6L437 97.6l-56.6 56.6-11.3 11.3-22.6-22.6zm22.6 203.6l11.3 11.3L437 414.4l11.3 11.3-22.6 22.6L414.4 437l-56.6-56.6-11.3-11.3 22.6-22.6zM336 256a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zm-192 0a112 112 0 1 1 224 0 112 112 0 1 1 -224 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <Tooltip text={"Light theme"} />
                </button>
              </div>
            </div>
            <button
              className="hover:bg-shade aspect-square w-10 rounded-full border border-gray-86 dark:border-gray-42 "
              data-state="closed"
              type="button"
              onClick={handleCloseSidebar}
            >
              <svg
                aria-hidden="true"
                className="svg-inline--fa fa-xmark fa-fw ml-2"
                data-icon="xmark"
                data-prefix="fasl"
                focusable="false"
                role="img"
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M192 233.4L59.5 100.9 36.9 123.5 169.4 256 36.9 388.5l22.6 22.6L192 278.6 324.5 411.1l22.6-22.6L214.6 256 347.1 123.5l-22.6-22.6L192 233.4z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <hr className="mx-8 border-gray-86 dark:border-gray-42" />
          <div className="contents [&>*]:grow">
            <div
              className="contents"
              dir="ltr"
              style={{
                "--radix-scroll-area-corner-height": "0px",
                "--radix-scroll-area-corner-width": "0px",
                position: "relative",
              }}
            >
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}",
                }}
              />
              <div
                className="flex flex-col [&>div]:!contents scroll-smooth !overflow-x-clip"
                data-radix-scroll-area-viewport=""
                style={{
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    display: "table",
                    minWidth: "100%",
                  }}
                >
                  <nav className="flex flex-col items-stretch py-1 pb-80">
                    <Link
                      aria-current="page"
                      className="aria-[current=page]:bg-shade hover:bg-shade border-s-2 border-transparent aria-[current=page]:border-primary active"
                      to="/founder"
                    >
                      <div className="flex items-center gap-4 px-6 py-4">
                        <div
                          className="flex aspect-square w-12 items-center justify-center rounded-full bg-gray-100 tracking-wide dark:bg-gray-50"
                          style={{ backgroundColor: "#6d7788" }}
                        >
                          {firstLetter}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <small className="text-xs uppercase tracking-wide text-gray-42 dark:text-gray-80">
                            Founder
                          </small>
                          <div className="relative min-w-0 overflow-clip overflow-ellipsis whitespace-nowrap">
                            {name}
                            <span className="invisible absolute">{name}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <hr className="mx-8 border-gray-50 dark:border-gray-50 " />
          <div className="flex flex-col gap-2 py-4 pr-10">
            <div className="px-8">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                {email}
              </small>
            </div>
            <div className="flex flex-col">
              <Link
                className="flex items-center gap-4 px-8 py-3 hover:bg-gray-94 dark:hover:bg-gray-42"
                to="/user/settings"
              >
                <svg
                  aria-hidden="true"
                  className="svg-inline--fa fa-user fa-fw "
                  data-icon="user"
                  data-prefix="fasl"
                  focusable="false"
                  role="img"
                  viewBox="0 0 448 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM43.3 480H404.7L360.4 336H87.6L43.3 480zM64 304H384l54.2 176 9.8 32H414.5 33.5 0l9.8-32L64 304z"
                    fill="currentColor"
                  />
                </svg>
                User Settings
              </Link>
              <div className="opacity-60" data-state="closed">
                <div className="pointer-events-none">
                  <Link
                    className="flex items-center gap-4 px-8 py-3 hover:bg-gray-94 dark:hover:bg-gray-42"
                    to="/user/subscription"
                  >
                    <svg
                      aria-hidden="true"
                      className="svg-inline--fa fa-receipt fa-fw "
                      data-icon="receipt"
                      data-prefix="fasl"
                      focusable="false"
                      role="img"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M87.9 452.2l-14.1-8L59 450.8l-27 12V49.2l27 12 14.8 6.6 14.1-8L129 36.3l48.7 24.3L192 67.8l14.3-7.2L255 36.3l41.1 23.5 14.1 8L325 61.2l27-12V462.8l-27-12-14.8-6.6-14.1 8L255 475.7l-48.7-24.3L192 444.2l-14.3 7.2L129 475.7 87.9 452.2zM0 512l32-14.2L72 480l56 32 64-32 64 32 56-32 40 17.8L384 512V477 35 0L352 14.2 312 32 256 0 192 32 128 0 72 32 32 14.2 0 0V35 477v35zM96 144H80v32H96 288h16V144H288 96zM80 336v32H96 288h16V336H288 96 80zm16-96H80v32H96 288h16V240H288 96z"
                        fill="currentColor"
                      />
                    </svg>
                    Subscription
                  </Link>
                </div>
              </div>
              <Link
                className="flex items-center gap-4 px-8 py-3 hover:bg-gray-94 dark:hover:bg-gray-42"
                to="/terms"
                target="_blank"
              >
                <svg
                  aria-hidden="true"
                  className="svg-inline--fa fa-file-lines fa-fw "
                  data-icon="file-lines"
                  data-prefix="fasl"
                  focusable="false"
                  role="img"
                  viewBox="0 0 384 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M352 480H32V32H192V176v16h16H352V480zM224 37.3L346.7 160H224V37.3zM232 0H32 0V32 480v32H32 352h32V480 152L232 0zM112 256H96v32h16H272h16V256H272 112zm0 64H96v32h16H272h16V320H272 112zm0 64H96v32h16H272h16V384H272 112z"
                    fill="currentColor"
                  />
                </svg>
                Terms
              </Link>
              <button
                className="flex items-center gap-4 px-8 py-3 hover:bg-gray-94 dark:hover:bg-gray-42"
                onClick={handleLogout}
              >
                <svg
                  aria-hidden="true"
                  className="svg-inline--fa fa-arrow-right-from-bracket fa-fw "
                  data-icon="arrow-right-from-bracket"
                  data-prefix="fasl"
                  focusable="false"
                  role="img"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M499.3 267.3L510.6 256l-11.3-11.3-128-128L360 105.4 337.4 128l11.3 11.3L449.4 240 176 240l-16 0 0 32 16 0 273.4 0L348.7 372.7 337.4 384 360 406.6l11.3-11.3 128-128zM176 64l16 0 0-32-16 0L16 32 0 32 0 48 0 464l0 16 16 0 160 0 16 0 0-32-16 0L32 448 32 64l144 0z"
                    fill="currentColor"
                  />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
