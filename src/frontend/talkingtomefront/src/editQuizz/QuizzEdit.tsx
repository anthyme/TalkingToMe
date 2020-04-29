import React from 'react';
import QuizzQuestionEdit from './QuizzQuestionEdit';

interface StateProps {
  questionIdRdx: number;
  questionRdx: Object;
  changeRequestRdx: number;
  switchRdx: boolean;
}
interface IProps {
  questionsID: number[];
  questionsJson: any;
}

const QuizzEdit: React.FC<IProps> = (props) => {
  const questionsID = props.questionsID;
  const questionsJson = props.questionsJson;

  return (
    <React.Fragment>
      <div className="questionsPanel">
        {questionsID.map((qId) => (
          <QuizzQuestionEdit
            key={qId}
            questionId={qId}
            questionsJson={questionsJson[questionsID.indexOf(qId)]}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default QuizzEdit;
