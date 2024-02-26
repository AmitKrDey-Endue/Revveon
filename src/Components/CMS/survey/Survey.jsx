import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../Wrapper/Wrapper";
import Open from "../QuestionType/Open";
import SingleSelect from "../QuestionType/SingleSelect";
import SingleSelectWithOther from "../QuestionType/SingleSelectWithOther";
import Dropdown from "../QuestionType/Dropdown";
import {
  fetchSurveyQuestion,
  submitSurveyAnswer,
} from "../../../redux/features/founderSurvey/founderSurveySlice";
import MultiSelect from "../QuestionType/MultiSelect";
import Rank from "../QuestionType/Rank";
import Matrix from "../QuestionType/Matrix";

const Survey = () => {
  const dispatch = useDispatch();
  const { question, isComplete, loading, error } = useSelector(
    (state) => state.survey
  );
  console.log("isComplete:", isComplete);

  useEffect(() => {
    dispatch(fetchSurveyQuestion());
  }, [dispatch]);

  const handleSubmit = (answer) => {
    console.log(answer);
    dispatch(submitSurveyAnswer(answer));
  };

  const renderQuestion = () => {
    if (loading === "pending") {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: {error}</div>;
    } else if (!question) {
      return null;
    }

    const { ans_type } = question;
    switch (ans_type) {
      case "Open":
      case "Email":
      case "Open Numeric":
        return <Open handleSubmit={handleSubmit} question={question} />;
      case "Single Select":
      case "5-Star Rating":
        return <SingleSelect handleSubmit={handleSubmit} question={question} />;
      case "Single Select with Other":
        return (
          <SingleSelectWithOther
            handleSubmit={handleSubmit}
            question={question}
          />
        );
      case "Dropdown":
        return <Dropdown handleSubmit={handleSubmit} question={question} />;
      case "Multi Select":
      case "Multi Select with Other":
        return <MultiSelect handleSubmit={handleSubmit} question={question} />;
      case "Rank":
        return <Rank handleSubmit={handleSubmit} question={question} />;
      case "Matrix":
        return <Matrix handleSubmit={handleSubmit} question={question} />;

      default:
        return null;
    }
  };

  return (
    <Wrapper>
      {isComplete ? (
        <div className="p-8">
          <div className="pt-20">Survey is completed</div>
        </div>
      ) : (
        <div className="p-8">
          <div className="pt-20">{renderQuestion()}</div>
        </div>
      )}
    </Wrapper>
  );
};

export default Survey;
