import React from "react";
import {
  communities,
  founderInsights,
  founderRewards,
  globe,
  industrySurvey,
  jotting,
  messages,
  portFolio,
} from "../../../../assets/ImagesSvg";
import { Link } from "react-router-dom";

const MenuSideBar = () => {
  return (
    <div>
      <div
        className="group absolute left-0 top-0 flex h-full w-20 flex-col justify-center gap-10  border-gray-100 bg-gray-86 transition-all dark:border-gray-50 dark:bg-gray-50 delay-200 duration-200 hover:w-56 hover:border-gray-100 hover:bg-white hover:delay-0 dark:hover:border-gray-50 dark:hover:bg-gray-50"
        style={{ backgroundColor: "hsl(230 19% 24%)" }}
      >
        <div className="flex flex-col">
          <Link
            className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
            to="/founder/portfolio"
          >
            <div className="text-2xl">
              <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                <img src={portFolio} alt="" />
              </div>
            </div>
            <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Portfolio
              </small>
            </span>
          </Link>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/messages"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={messages} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Messages
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/rewards"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={founderRewards} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Founder Rewards
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/insights"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={founderInsights} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Founder Insights
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/communities"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={communities} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Communities
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/jotting"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={jotting} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Jotting
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/big-problem"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={globe} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Big Problem
                  </small>
                </span>
              </Link>
            </div>
          </div>
          <div className="opacity-60" data-state="closed">
            <div className="pointer-events-none">
              <Link
                className="aria-[current=page]:bg-shade hover:bg-shade flex items-center gap-4 border-e border-transparent py-2 ps-7 aria-[current=page]:border-primary aria-[current=page]:text-primary"
                to="/founder/industry-survey"
              >
                <div className="text-2xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={industrySurvey} alt="" />
                  </div>
                </div>
                <span className="whitespace-nowrap transition-opacity pointer-events-none opacity-0 delay-200 duration-200 group-hover:opacity-100 group-hover:delay-0">
                  <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                    Industry Survey
                  </small>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSideBar;
