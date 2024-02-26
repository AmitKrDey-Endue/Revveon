import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  fetchPreviousQuestion,
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";

const Open = ({ question }) => {
  const dispatch = useDispatch();
  const { QID, description, answers, mandatory, defaultValue, ans_type } =
    question;
  const [userAnswer, setUserAnswer] = useState(
    defaultValue ? defaultValue[0] : null
  );
  const [nextQuestionId, setNextQuestionId] = useState(null);
  const [prevQuestionId, setPrevQuestionId] = useState(null);

  useEffect(() => {
    if (answers && answers.length > 0 && answers[0].AnsString) {
      setUserAnswer(answers[0].AnsString);
    }
  }, [answers]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };
  const submitAnswer = (event) => {
    event.preventDefault();
    if (userAnswer.trim() !== "") {
      let payload;
      if (ans_type === "Open Numeric") {
        payload = { QID, AnsID: userAnswer };
      } else if (ans_type === "email") {
        payload = { QID, AnsString: userAnswer };
      } else {
        payload = { QID, AnsString: userAnswer };
      }

      dispatch(submitSurveyAnswer(payload)).then((response) => {
        const nextQID = response.payload[0]?.QID;
        console.log("Next Question ID:", nextQID);
        setNextQuestionId(nextQID);
      });
      setUserAnswer("");
    }
  };

  const skipQuestion = () => {
    dispatch(submitSurveyAnswer({ QID, AnsString: null })).then((response) => {
      const nextQID = response.payload[0]?.QID;
      console.log("Next Question ID:", nextQID);
      setNextQuestionId(nextQID);
    });
    setUserAnswer("");
  };

  const goBack = async () => {
    console.log("Going back...");
    console.log("Current Question ID:", QID);
    try {
      const response = await dispatch(fetchPreviousQuestion(QID));
      const prevQID = response.payload[0]?.QID;
      console.log("Previous Question ID:", prevQID);
      setPrevQuestionId(prevQID);
    } catch (error) {
      console.error("Error fetching previous question:", error);
    }
  };

  useEffect(() => {
    if (nextQuestionId) {
      console.log(nextQuestionId);
      dispatch(fetchSurveyQuestion(nextQuestionId));
      console.log("Page Render");
    }
  }, [nextQuestionId, QID, dispatch]);

  useEffect(() => {
    setPrevQuestionId(QID);
  }, [prevQuestionId]);

  return (
    <div>
      <div className="flex flex-col items-center">
        <form className="max-w-lg" onSubmit={submitAnswer}>
          <div className="flex flex-col gap-16">
            <div className="self-start ps-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="contents text-sm font-bold uppercase tracking-wide text-gray-31 dark:text-white">
                    Founder Survey
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1 rounded-sm underline decoration-1 underline-offset-4 outline-2 outline-blue-62 hover:decoration-2 focus-visible:outline disabled:no-underline disabled:opacity-70"
                  disabled=""
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fasl"
                    data-icon="arrow-left"
                    className="svg-inline--fa fa-arrow-left "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M12.7 244.7L1.4 256l11.3 11.3 168 168L192 446.6 214.6 424l-11.3-11.3L62.6 272 432 272l16 0 0-32-16 0L62.6 240 203.3 99.3 214.6 88 192 65.4 180.7 76.7l-168 168z"
                    />
                  </svg>
                  Back
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex">
                <div
                  className="rounded-rl-sm -me-2 h-6 w-8 shrink-0 bg-white dark:bg-gray-42 rtl:-scale-x-100"
                  style={{
                    clipPath: "polygon(0% 4%, 100% 100%, 100% 0%, 0% 0%)",
                    backgroundColor: " hsl(228 11% 42%)",
                    zIndex: "-10",
                  }}
                />
                <div
                  className="rounded-md bg-white px-6 py-4 text-lg dark:bg-gray-42"
                  style={{
                    backgroundColor: " hsl(228 11% 42%)",
                  }}
                >
                  <span id=":r8:">{description}</span>
                  {mandatory && <span className="text-red-500">*</span>}
                </div>
              </div>
              <div className="flex flex-col items-start gap-8 ps-12">
                <div
                  className="flex flex-col gap-1 self-stretch"
                  data-valid="true"
                >
                  {ans_type === "Open Numeric" ? (
                    <input
                      type="number"
                      className="grow rounded-sm border border-gray-80 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-62 data-[invalid]:border-red-50 dark:border-gray-42 dark:bg-gray-24 dark:data-[invalid]:border-yellow-57"
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      style={{ backgroundColor: "hsl(230 19% 24%)" }}
                      required={mandatory}
                    />
                  ) : ans_type === "email" ? (
                    <input
                      type="email"
                      className="grow rounded-sm border border-gray-80 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-62 data-[invalid]:border-red-50 dark:border-gray-42 dark:bg-gray-24 dark:data-[invalid]:border-yellow-57"
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      style={{ backgroundColor: "hsl(230 19% 24%)" }}
                      required={mandatory}
                    />
                  ) : (
                    <textarea
                      className="grow rounded-sm border border-gray-80 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-62 data-[invalid]:border-red-50 dark:border-gray-42 dark:bg-gray-24 dark:data-[invalid]:border-yellow-57"
                      rows={4}
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      style={{ backgroundColor: "hsl(230 19% 24%)" }}
                      required={mandatory}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 ps-12">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                style={{
                  backgroundColor: " #c892c7",
                  color: "hsl(233 20% 16%)",
                }}
              >
                Next
              </button>
              <button
                type="button"
                onClick={skipQuestion}
                className="hover:bg-shade flex items-center justify-center whitespace-nowrap rounded-sm border  border-gray-86 leading-none text-primary active:brightness-105 disabled:pointer-events-none disabled:opacity-70 disabled:grayscale dark:border-gray-42 gap-2 px-4 py-3 text-base"
                disabled={mandatory ? true : ""}
              >
                Skip
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Open;
