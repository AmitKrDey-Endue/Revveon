import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchPreviousQuestion,
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";
import Loading from "../Loading/Loading";

const Rank = ({ question, loading }) => {
  const dispatch = useDispatch();
  const { description, answers, QID, mandatory, defaultValue } = question;

  const [availableAnswers, setAvailableAnswers] = useState(answers);
  const [selectedAnswers, setSelectedAnswers] = useState(defaultValue || []);
  const [isDraggingOverSelected, setIsDraggingOverSelected] = useState(false);
  const [isDraggingOverAvailable, setIsDraggingOverAvailable] = useState(false);

  const handleDragOver = (event, destination) => {
    event.preventDefault();
    if (destination === "selected") {
      setIsDraggingOverSelected(true);
      setIsDraggingOverAvailable(false);
    } else if (destination === "available") {
      setIsDraggingOverAvailable(true);
      setIsDraggingOverSelected(false);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOverSelected(false);
    setIsDraggingOverAvailable(false);
  };

  useEffect(() => {
    const uniqueAnswers = answers.filter(
      (answer, index, self) =>
        index === self.findIndex((a) => a.AnsID === answer.AnsID)
    );
    setAvailableAnswers(uniqueAnswers);

    const defaultSelectedAnswers = answers.filter((answer) =>
      defaultValue.includes(answer.AnsID)
    );
    setSelectedAnswers(defaultSelectedAnswers);

    const filteredAvailableAnswers = availableAnswers.filter(
      (answer) =>
        !defaultSelectedAnswers.some(
          (selectedAnswer) => selectedAnswer.AnsID === answer.AnsID
        )
    );
    setAvailableAnswers(filteredAvailableAnswers);
  }, [answers, defaultValue]);

  const handleDragStart = (event, answer) => {
    console.log("Answer:", answer);
    event.dataTransfer.setData("text/plain", JSON.stringify(answer));
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (event, destination, dropIndex) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    console.log("Data:", data);
    if (!data) {
      console.error("Empty or invalid JSON data.");
      return;
    }

    try {
      const answer = JSON.parse(data);

      if (
        destination === "selected" &&
        selectedAnswers.some((item) => item.AnsID === answer.AnsID)
      ) {
        console.log("Answer already exists in selected section.");
        return;
      } else if (
        destination === "available" &&
        availableAnswers.some((item) => item.AnsID === answer.AnsID)
      ) {
        console.log("Answer already exists in available section.");
        return;
      }

      if (destination === "selected") {
        setSelectedAnswers((prevAnswers) => {
          const newSelectedAnswers = [...prevAnswers];
          newSelectedAnswers.splice(dropIndex, 0, answer);
          return newSelectedAnswers;
        });
        setAvailableAnswers(
          availableAnswers.filter((item) => item.AnsID !== answer.AnsID)
        );
      } else if (destination === "available") {
        setAvailableAnswers((prevAnswers) => {
          const newAvailableAnswers = [...prevAnswers];
          newAvailableAnswers.splice(dropIndex, 0, answer);
          return newAvailableAnswers;
        });
        setSelectedAnswers(
          selectedAnswers.filter((item) => item.AnsID !== answer.AnsID)
        );
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    const selectedAnsIDs = selectedAnswers.map((answer) => answer.AnsID);

    if (selectedAnsIDs.length > 0) {
      dispatch(submitSurveyAnswer({ QID, AnsID: selectedAnsIDs })).then(
        (response) => {
          const nextQID = response.payload[0]?.QID;
          if (nextQID) {
            dispatch(fetchSurveyQuestion(nextQID));
          }
        }
      );
      setSelectedAnswers([]);
    } else {
      console.error("Please select at least one answer");
    }
  };

  const skipQuestion = () => {
    dispatch(submitSurveyAnswer({ QID, AnsID: null })).then((response) => {
      const nextQID = response.payload[0]?.QID;
      if (nextQID) {
        dispatch(fetchSurveyQuestion(nextQID));
      }
    });
  };

  const goBack = () => {
    console.log("Going back...");
    console.log("Current Question ID:", QID);
    dispatch(fetchPreviousQuestion(QID)).then((response) => {
      console.log(response);
    });
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updatedSelectedAnswers = [...selectedAnswers];
    const temp = updatedSelectedAnswers[index - 1];
    updatedSelectedAnswers[index - 1] = updatedSelectedAnswers[index];
    updatedSelectedAnswers[index] = temp;

    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleMoveDown = (index) => {
    if (index === selectedAnswers.length - 1) return;

    const updatedSelectedAnswers = [...selectedAnswers];
    const temp = updatedSelectedAnswers[index + 1];
    updatedSelectedAnswers[index + 1] = updatedSelectedAnswers[index];
    updatedSelectedAnswers[index] = temp;

    setSelectedAnswers(updatedSelectedAnswers);
  };

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
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-3">
                    <span id=":r2k:">
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        Available
                      </small>
                    </span>
                    <div
                      className={`flex grow flex-col gap-2 border border-dashed pb-6 ${
                        isDraggingOverAvailable ? "border-blue-500" : ""
                      }`}
                      onDrop={(e) => handleDrop(e, "available")}
                      onDragOver={(e) => handleDragOver(e, "available")}
                      onDragLeave={handleDragLeave}
                      id="available"
                    >
                      {availableAnswers.map((answer, index) => (
                        <div
                          key={`available-${answer.AnsID}-${index}`}
                          role="listitem"
                          className="flex cursor-move items-center rounded-sm border border-gray-80 bg-white px-1.5 transition-transform dark:border-gray-42 dark:bg-gray-24"
                          draggable="true"
                          onDragStart={(event) =>
                            handleDragStart(event, answer)
                          }
                          style={{
                            backgroundColor: " hsl(230 19% 24%)",
                          }}
                        >
                          <div className="flex grow items-center gap-3 self-stretch ps-3">
                            <span className="text-sm text-gray-42 dark:text-gray-80">
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fasl"
                                data-icon="grip-dots-vertical"
                                className="svg-inline--fa fa-grip-dots-vertical "
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M64 96A16 16 0 1 0 32 96a16 16 0 1 0 32 0zM0 96a48 48 0 1 1 96 0A48 48 0 1 1 0 96zM64 256a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM0 256a48 48 0 1 1 96 0A48 48 0 1 1 0 256zM48 432a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm0-64a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM224 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-64 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm48 176a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm0-64a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm16 208a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-64 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"
                                />
                              </svg>
                            </span>
                            <div className="contents [&>*]:grow">
                              <span className="py-2.5 leading-snug">
                                {answer.AnsString}
                              </span>
                            </div>
                            <div
                              className="flex w-6 items-center justify-center self-stretch text-sm text-gray-42 hover:text-primary dark:text-gray-80 dark:hover:text-primary"
                              aria-label="Select"
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fasl"
                                data-icon="chevron-right"
                                className="svg-inline--fa fa-chevron-right "
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M310.6 256l-11.3 11.3-192 192L96 470.6 73.4 448l11.3-11.3L265.4 256 84.7 75.3 73.4 64 96 41.4l11.3 11.3 192 192L310.6 256z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span id=":r2e:">
                      <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                        Selected
                      </small>
                    </span>
                    <div
                      className={`flex grow flex-col gap-2 border border-dashed pb-6 ${
                        isDraggingOverSelected ? "border-blue-500" : ""
                      }`}
                      onDrop={(e) => handleDrop(e, "selected")}
                      onDragOver={(e) => handleDragOver(e, "selected")}
                      onDragLeave={handleDragLeave}
                      id="selected"
                    >
                      {selectedAnswers.map((answer, index) => (
                        <div
                          key={`selected-${answer.AnsID}-${index}`}
                          role="listitem"
                          className="flex cursor-move items-center gap-1 rounded-sm border border-gray-80 bg-white px-1.5 transition-transform dark:border-gray-42 dark:bg-gray-24"
                          draggable="true"
                          style={{
                            backgroundColor: " hsl(230 19% 24%)",
                          }}
                        >
                          <button
                            aria-label="Deselect"
                            className="flex w-6 items-center justify-center self-stretch text-sm text-gray-42 hover:text-primary dark:text-gray-80 dark:hover:text-primary"
                            type="button"
                          >
                            <svg
                              aria-hidden="true"
                              className="svg-inline--fa fa-chevron-left "
                              data-icon="chevron-left"
                              data-prefix="fasl"
                              focusable="false"
                              role="img"
                              viewBox="0 0 320 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.4 256l11.3-11.3 192-192L224 41.4 246.6 64 235.3 75.3 54.6 256 235.3 436.7 246.6 448 224 470.6l-11.3-11.3-192-192L9.4 256z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                          <div className="contents [&>*]:grow">
                            <span className="py-2.5 leading-snug">
                              {answer.AnsString}
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-px">
                            <button
                              aria-label="Move up"
                              className="flex aspect-square w-6 origin-bottom items-end justify-center text-sm text-gray-42 hover:text-primary disabled:pointer-events-none disabled:opacity-60 dark:text-gray-80 dark:hover:text-primary"
                              type="button"
                              onClick={() => handleMoveUp(index)}
                              disabled={index === 0}
                            >
                              <svg
                                aria-hidden="true"
                                className="svg-inline--fa fa-chevron-up "
                                data-icon="chevron-up"
                                data-prefix="fasl"
                                focusable="false"
                                role="img"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M256 105.4l11.3 11.3 192 192L470.6 320 448 342.6l-11.3-11.3L256 150.6 75.3 331.3 64 342.6 41.4 320l11.3-11.3 192-192L256 105.4z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                            <span className="text-sm text-gray-42 dark:text-gray-80">
                              <svg
                                aria-hidden="true"
                                className="svg-inline--fa fa-grip-dots-vertical "
                                data-icon="grip-dots-vertical"
                                data-prefix="fasl"
                                focusable="false"
                                role="img"
                                viewBox="0 0 256 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M64 96A16 16 0 1 0 32 96a16 16 0 1 0 32 0zM0 96a48 48 0 1 1 96 0A48 48 0 1 1 0 96zM64 256a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM0 256a48 48 0 1 1 96 0A48 48 0 1 1 0 256zM48 432a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm0-64a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM224 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-64 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm48 176a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm0-64a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm16 208a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-64 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                            <button
                              aria-label="Move down"
                              className="flex aspect-square w-6 origin-top items-start justify-center text-sm text-gray-42 hover:text-primary disabled:pointer-events-none disabled:opacity-60 dark:text-gray-80 dark:hover:text-primary"
                              type="button"
                              onClick={() => handleMoveDown(index)}
                              disabled={index === selectedAnswers.length - 1}
                            >
                              <svg
                                aria-hidden="true"
                                className="svg-inline--fa fa-chevron-down "
                                data-icon="chevron-down"
                                data-prefix="fasl"
                                focusable="false"
                                role="img"
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M256 406.6l11.3-11.3 192-192L470.6 192 448 169.4l-11.3 11.3L256 361.4 75.3 180.7 64 169.4 41.4 192l11.3 11.3 192 192L256 406.6z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 ps-12">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-3 text-base leading-none text-white hover:brightness-95 active:brightness-105 disabled:pointer-events-none disabled:opacity-70 dark:text-gray-16"
                style={{
                  backgroundColor: " #c892c7",
                  color: "hsl(233 20% 16%)",
                }}
              >
                {loading ? <Loading /> : "Next"}
              </button>
              <button
                type="button"
                onClick={skipQuestion}
                className="hover:bg-shade flex items-center justify-center whitespace-nowrap rounded-sm border  border-gray-86 leading-none text-primary active:brightness-105 disabled:pointer-events-none disabled:opacity-70 disabled:grayscale dark:border-gray-42 gap-2 px-4 py-3 text-base"
                disabled={mandatory || loading}
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

export default Rank;
