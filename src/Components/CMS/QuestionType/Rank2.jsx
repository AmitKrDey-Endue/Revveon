import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchPreviousQuestion,
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loading from "../Loading/Loading";

const Rank = ({ question, loading }) => {
  const dispatch = useDispatch();
  const { description, answers, QID, mandatory, defaultValue } = question;
  const [selectedAnswers, setSelectedAnswers] = useState(
    defaultValue ? defaultValue : []
  );

  const handleAnswerSelection = (answerId) => {
    const index = selectedAnswers.indexOf(answerId);
    if (index === -1) {
      setSelectedAnswers([...selectedAnswers, answerId]);
    } else {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers.splice(index, 1);
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedAnswers = Array.from(selectedAnswers);
    const [removed] = updatedAnswers.splice(sourceIndex, 1);
    updatedAnswers.splice(destinationIndex, 0, removed);

    setSelectedAnswers(updatedAnswers);
  };

  const submitAnswer = (event) => {
    event.preventDefault();
    console.log(selectedAnswers);
    if (selectedAnswers.length > 0) {
      dispatch(submitSurveyAnswer({ QID, AnsID: selectedAnswers })).then(
        (response) => {
          const nextQID = response.payload[0]?.QID;
          console.log("Next Question ID:", nextQID);
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
      console.log("Next Question ID:", nextQID);
      setNextQuestionId(nextQID);
    });
  };

  const goBack = () => {
    console.log("Going back...");
    console.log("Current Question ID:", QID);
    dispatch(fetchPreviousQuestion(QID)).then((response) => {
      console.log(response);
    });
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
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                      <span id=":r2k:">
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                          Available
                        </small>
                      </span>
                      <Droppable droppableId="available-answers">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            role="list"
                            aria-labelledby=":r2k:"
                            className="flex grow flex-col gap-2 border border-dashed pb-6 border-transparent "
                          >
                            {answers.map((answer, index) => (
                              <Draggable
                                key={answer.AnsID}
                                draggableId={answer.AnsID.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    role="listitem"
                                    className="flex cursor-move items-center rounded-sm border border-gray-80 bg-white px-1.5 transition-transform dark:border-gray-42 dark:bg-gray-24"
                                    draggable="true"
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
                                      <button
                                        type="button"
                                        className="flex w-6 items-center justify-center self-stretch text-sm text-gray-42 hover:text-primary dark:text-gray-80 dark:hover:text-primary"
                                        aria-label="Select"
                                        onClick={() =>
                                          handleAnswerSelection(answer.AnsID)
                                        }
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
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                    <div className="flex flex-col gap-3">
                      <span id=":r2e:">
                        <small className="contents text-sm font-normal leading-snug tracking-wide text-gray-42 dark:text-gray-80">
                          Selected
                        </small>
                      </span>
                      <Droppable droppableId="selected-answers">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            role="list"
                            aria-labelledby=":r2e:"
                            className="flex grow flex-col gap-2 border border-dashed pb-6 "
                          >
                            {selectedAnswers.map((answerId, index) => {
                              const answer = answers.find(
                                (a) => a.AnsID === answerId
                              );
                              if (!answer) return null;
                              return (
                                <Draggable
                                  key={answer.AnsID}
                                  draggableId={answer.AnsID.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      role="listitem"
                                      className="flex cursor-move items-center gap-1 rounded-sm border border-gray-80 bg-white px-1.5 transition-transform dark:border-gray-42 dark:bg-gray-24"
                                      draggable="true"
                                      style={{
                                        backgroundColor: " hsl(230 19% 24%)",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        className="flex w-6 items-center justify-center self-stretch text-sm text-gray-42 hover:text-primary dark:text-gray-80 dark:hover:text-primary"
                                        aria-label="Deselect"
                                        onClick={() =>
                                          handleAnswerSelection(answer.AnsID)
                                        }
                                      >
                                        <svg
                                          aria-hidden="true"
                                          focusable="false"
                                          data-prefix="fasl"
                                          data-icon="chevron-left"
                                          className="svg-inline--fa fa-chevron-left "
                                          role="img"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 320 512"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M9.4 256l11.3-11.3 192-192L224 41.4 246.6 64 235.3 75.3 54.6 256 235.3 436.7 246.6 448 224 470.6l-11.3-11.3-192-192L9.4 256z"
                                          />
                                        </svg>
                                      </button>
                                      <div className="contents [&>*]:grow">
                                        <span className="py-2.5 leading-snug">
                                          {answer.AnsString}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                </DragDropContext>
              </div>
            </div>
            droppable1
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
