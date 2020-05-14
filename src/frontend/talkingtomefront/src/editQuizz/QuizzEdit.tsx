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
  editing:boolean
}

const QuizzEdit: React.FC<IProps> = (props) => {
  const questionsID = props.questionsID;
  const questionsJson = props.questionsJson;
  const editing = props.editing;

  return (
    <React.Fragment>
      <div className="questionsPanel">
        {questionsID.map((qId) => (
          <QuizzQuestionEdit
            key={qId}
            questionId={qId}
            questionsJson={questionsJson[questionsID.indexOf(qId)]}
            editing= {editing}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default QuizzEdit;
