import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchPreviousQuestion,
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";

const Matrix = ({ question }) => {
  const dispatch = useDispatch({ question });
  const { description, answers, QID, mandatory, defaultValue } = question;

  const [selectedAnswer, setSelectedAnswer] = useState(
    defaultValue
      ? defaultValue.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})
      : {}
  );

  const [nextQuestionId, setNextQuestionId] = useState(null);
  const [prevQuestionId, setPrevQuestionId] = useState(null);

  const [totalPercentageError, setTotalPercentageError] = useState(false);

  const handleAnswerSelection = (answerId, value) => {
    setSelectedAnswer((prevState) => ({
      ...prevState,
      [answerId]: value,
    }));
  };

  const calculateTotalPercentage = () => {
    const totalPercentage = Object.values(selectedAnswer).reduce(
      (total, currentValue) => total + parseFloat(currentValue || 0),
      0
    );
    return totalPercentage;
  };

  const submitAnswer = (event) => {
    event.preventDefault();
    const totalPercentage = calculateTotalPercentage();
    if (totalPercentage > 100) {
      setTotalPercentageError(true);
      return;
    }
    setTotalPercentageError(false);

    const selectedAnsValues = Object.values(selectedAnswer).filter(
      (value) => value > 0
    );

    console.log(selectedAnsValues);
    if (selectedAnsValues.length > 0) {
      dispatch(submitSurveyAnswer({ QID, AnsID: selectedAnsValues })).then(
        (response) => {
          const nextQID = response.payload[0]?.QID;
          if (nextQID) {
            dispatch(fetchSurveyQuestion(nextQID));
          }
        }
      );
      setSelectedAnswer(
        defaultValue
          ? defaultValue.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})
          : {}
      );
    } else {
      console.error("Please select at least one answer");
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
      console.log(response);
      setPrevQuestionId(response.payload[0]);
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

  useEffect(() => {
    if (defaultValue) {
      setSelectedAnswer(defaultValue[0]);
    }
  }, [defaultValue]);

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
                  className="inline-flex items-center gap-1 rounded-sm underline decoration-1 underline-offset-4 outline-2 outline-blue-62 hover:decoration-2 focus-visible:outline disabled:no-underline disabled:opacity-70"
                  onClick={goBack}
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
                  <span id=":r22:">{description}</span>
                  {mandatory && <span className="text-red-500">*</span>}
                </div>
              </div>
              <div className="flex flex-col items-start gap-8 ps-12">
                <div className="grid grid-cols-[max-content,auto] items-center gap-4">
                  {answers.map((answer) => (
                    <div className="contents" key={answer.AnsID}>
                      <label htmlFor={213}>{answer.AnsString}</label>
                      <div
                        className="flex items-stretch divide-x divide-gray-80 rounded-sm border border-gray-80 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-1 focus-within:outline-blue-62 data-[invalid]:border-red-50 dark:divide-gray-42 dark:border-gray-42 dark:data-[invalid]:border-yellow-57 bg-white dark:bg-gray-24"
                        style={{
                          backgroundColor: " hsl(230 19% 24%)",
                          borderColor: "hsl(228 11% 42%)",
                        }}
                      >
                        <input
                          className="min-w-0 grow bg-transparent p-2 focus:outline-none"
                          type="text"
                          inputMode="numeric"
                          min="0"
                          max="100"
                          pattern="[0-9]*"
                          id={answer.AnsID}
                          value={selectedAnswer[answer.AnsID] || ""}
                          placeholder="0"
                          onChange={(e) => {
                            const inputValue = e.target.value;

                            if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
                              handleAnswerSelection(answer.AnsID, inputValue);
                            }
                          }}
                        />
                        <div
                          className="flex items-center bg-gray-94 p-2 dark:bg-gray-31"
                          style={{
                            backgroundColor: " hsl(228 11% 42%)",
                            borderColor: "hsl(228 11% 42%)",
                          }}
                        >
                          <small className="contents text-sm font-normal leading-snug tracking-wide">
                            %
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 self-stretch">
                  <input
                    title=""
                    className="hidden"
                    type="number"
                    id="radix-:r2n:"
                    name=":r2m:"
                  />
                  {totalPercentageError && (
                    <small className="contents text-sm font-normal leading-snug tracking-wide text-red-50 dark:text-yellow-57">
                      Total is over 100%
                    </small>
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

export default Matrix;
