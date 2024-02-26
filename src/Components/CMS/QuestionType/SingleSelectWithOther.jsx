import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchPreviousQuestion,
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";

const SingleSelectWithOther = ({ question }) => {
  const dispatch = useDispatch();
  const { description, answers, QID, mandatory, defaultValue } = question;
  const [selectedAnswer, setSelectedAnswer] = useState(
    defaultValue ? defaultValue[0] : null
  );
  const [nextQuestionId, setNextQuestionId] = useState(null);
  const [otherOption, setOtherOption] = useState("");
  const [prevQuestionId, setPrevQuestionId] = useState(null);

  const handleAnswerSelection = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const submitAnswer = (event) => {
    event.preventDefault();
    const answerToSend =
      selectedAnswer === "Other" ? otherOption : selectedAnswer;
    if (answerToSend !== null) {
      dispatch(submitSurveyAnswer({ QID, AnsID: answerToSend })).then(
        (response) => {
          const nextQID =
            response.payload && response.payload.length > 0
              ? response.payload[0]?.QID
              : null;

          setNextQuestionId(nextQID);
        }
      );
      setSelectedAnswer(null);
      setOtherOption("");
    } else {
      console.error("Please select an answer");
    }
  };


  const skipQuestion = () => {
    dispatch(submitSurveyAnswer({ QID, AnsID: null })).then((response) => {
      const nextQID = response.payload[0]?.QID;
      console.log("Next Question ID:", nextQID);
      setNextQuestionId(nextQID);
    });

  };

  const goBack = () => {
    console.log("Going back...");
    console.log("Current Question ID:", QID);
    dispatch(fetchPreviousQuestion(prevQuestionId)).then((response) => {
      setPrevQuestionId(response.payload[0]);
      console.log(response);
    });
  };

  useEffect(() => {
    if (nextQuestionId) {
      dispatch(fetchSurveyQuestion(nextQuestionId));
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
                  className="rounded-rl-sm -me-2 h-6 w-8 shrink-0 dark:bg-gray-50 rtl:-scale-x-100"
                  style={{
                    clipPath: "polygon(0% 4%, 100% 100%, 100% 0%, 0% 0%)",
                    backgroundColor: " hsl(228 11% 42%)",
                    zIndex:"-10"
                  }}
                />
                <div
                  className="rounded-md px-6 py-4 text-lg"
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
                  <div
                    role="radiogroup"
                    className="flex flex-col gap-2"
                    aria-labelledby=":r8:"
                  >
                    {answers.map((answer) => (
                      <div key={answer.AnsID} className="flex flex-col">
                        <div className="hover:bg-shade">
                          <label
                            className={`flex gap-2.5 p-2.5 ${
                              selectedAnswer === answer.AnsID ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              className="w-3.5 accent-primary"
                              required=""
                              name={`answer-${QID}`}
                              value={answer.AnsID}
                              checked={selectedAnswer === answer.AnsID}
                              onChange={() =>
                                handleAnswerSelection(answer.AnsID)
                              }
                              data-valid="true"
                            />
                            {answer.AnsString}
                          </label>
                        </div>
                      </div>
                    ))}
                    {selectedAnswer === "Other" && (
                      <div className="hover:bg-shade">
                        <input
                          type="text"
                          required={mandatory}
                          className="w-full p-2.5 border border-gray-80 rounded-sm dark:border-gray-42 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-62"
                          placeholder="Enter other option"
                          value={otherOption}
                          onChange={handleOtherOptionChange}
                        />
                      </div>
                    )}
                  </div>
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
                disabled={mandatory && !selectedAnswer}
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

export default SingleSelectWithOther;
