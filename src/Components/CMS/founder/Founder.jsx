import { Link } from "react-router-dom";
import {
  communities,
  crm,
  founderInsights,
  founderRewards,
  funding,
  globe,
  industrySurvey,
  jotting,
  marketLab,
  messages,
  messagesQuestions,
  portFolio,
  recuruitment,
  salesFunnel,
} from "../../../assets/ImagesSvg";

import Wrapper from "../Wrapper/Wrapper";
import { fetchSurveyQuestion } from "../../../redux/features/founderSurvey/founderSurveySlice";
import { useDispatch } from "react-redux";

const Founder = () => {
  const dispatch = useDispatch();
  const localStorageDate = localStorage.getItem("date_survey_completed");
  const date_survey_completed = localStorageDate
    ? JSON.parse(localStorageDate)
    : null;
  console.log(date_survey_completed);
  return (
    <Wrapper>
      <div style={{ paddingTop: "8rem", paddingInline: "2rem" }}>
        <div className="flex flex-col pb-8 ">
          {date_survey_completed == null && (
            <div>
              <div
                className="flex items-center gap-5 rounded-sm border border-primary bg-primary bg-opacity-5 py-3 pe-3 ps-5"
                style={{
                  borderColor: " #c892c7",
                }}
              >
                <div className="text-2xl text-primary">
                  <img src={messagesQuestions} alt="" />
                </div>
                <div className="flex grow flex-col gap-0.5">
                  <div>
                    <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                      Take the 2024 Founder Survey
                    </h2>
                  </div>

                  <div>
                    <small className="contents text-sm font-normal leading-snug tracking-wide">
                      Gain 1 year of free access to Revveon
                    </small>
                  </div>
                </div>
                <Link to="/founder/survey">
                  <button
                    type="button"
                    style={{
                      color: " #c892c7",
                    }}
                    className="hover:bg-stone-700 flex items-center justify-center whitespace-nowrap rounded-sm leading-none text-primary active:brightness-105 disabled:pointer-events-none disabled:opacity-70 gap-2 px-4 py-3 text-base"
                    onClick={() => dispatch(fetchSurveyQuestion)}
                  >
                    Take the survey
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8">
          <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
            Founder Toolkit
          </h1>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-8">
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all bg-white shadow-md hover:scale-[101%] hover:shadow-lg active:shadow-none dark:bg-gray-50"
              to="/founder/portfolio"
              style={{ background: "#464565" }}
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-gradient-to-tr from-purple-44 to-purple-36 hover:bg-white dark:from-purple-50 dark:to-white">
                    <img src={portFolio} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Portfolio
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-50" />
              </div>
              <div className="flex gap-3 px-6" />
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={messages} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Messages
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={founderRewards} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Founder Rewards
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={founderInsights} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Founder Insights
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={communities} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Communities
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={jotting} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Jotting
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={globe} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Big Problem
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
            <Link
              className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
              to="/founder"
            >
              <div className="flex grow flex-col gap-2">
                <div className="self-end pr-4 text-3xl">
                  <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                    <img src={industrySurvey} alt="" />
                  </div>
                </div>
                <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                  Industry Survey
                </div>
              </div>
              <div className="px-6 pb-3 pt-2">
                <hr className="border-gray-86 dark:border-gray-42" />
              </div>
              <div className="flex gap-3 px-6">
                <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                  Coming soon
                </small>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="contents text-4xl font-thin text-gray-27 dark:text-white">
          Startups
        </h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-8">
          <Link
            className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
            to="/founder"
          >
            <div className="flex grow flex-col gap-2">
              <div className="self-end pr-4 text-3xl">
                <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                  <img src={marketLab} alt="" />
                </div>
              </div>
              <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                Market Lab
              </div>
            </div>
            <div className="px-6 pb-3 pt-2">
              <hr className="border-gray-86 dark:border-gray-42" />
            </div>
            <div className="flex gap-3 px-6">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Coming soon
              </small>
            </div>
          </Link>
          <Link
            className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
            to="/founder"
          >
            <div className="flex grow flex-col gap-2">
              <div className="self-end pr-4 text-3xl">
                <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                  <img src={funding} alt="" />
                </div>
              </div>
              <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                Funding
              </div>
            </div>
            <div className="px-6 pb-3 pt-2">
              <hr className="border-gray-86 dark:border-gray-42" />
            </div>
            <div className="flex gap-3 px-6">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Coming soon
              </small>
            </div>
          </Link>
          <Link
            className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
            to="/founder"
          >
            <div className="flex grow flex-col gap-2">
              <div className="self-end pr-4 text-3xl">
                <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                  <img src={salesFunnel} alt="" />
                </div>
              </div>
              <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                Sales Funnel
              </div>
            </div>
            <div className="px-6 pb-3 pt-2">
              <hr className="border-gray-86 dark:border-gray-42" />
            </div>
            <div className="flex gap-3 px-6">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Coming soon
              </small>
            </div>
          </Link>
          <Link
            className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
            to="/founder"
          >
            <div className="flex grow flex-col gap-2">
              <div className="self-end pr-4 text-3xl">
                <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                  <img src={crm} alt="" />
                </div>
              </div>
              <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                CRM
              </div>
            </div>
            <div className="px-6 pb-3 pt-2">
              <hr className="border-gray-86 dark:border-gray-42" />
            </div>
            <div className="flex gap-3 px-6">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Coming soon
              </small>
            </div>
          </Link>
          <Link
            className="flex grow flex-col rounded-sm py-4 pb-5 transition-all pointer-events-none border border-gray-86 opacity-75 dark:border-gray-42"
            to="/founder"
          >
            <div className="flex grow flex-col gap-2">
              <div className="self-end pr-4 text-3xl">
                <div className="inline-block aspect-square w-[1em] align-[-0.125em] bg-transparent ">
                  <img src={recuruitment} alt="" />
                </div>
              </div>
              <div className="grow px-6 font-montserrat text-lg font-bold uppercase text-gray-31 dark:text-white">
                Recruitment
              </div>
            </div>
            <div className="px-6 pb-3 pt-2">
              <hr className="border-gray-86 dark:border-gray-42" />
            </div>
            <div className="flex gap-3 px-6">
              <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                Coming soon
              </small>
            </div>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Founder;
