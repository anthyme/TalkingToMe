import React from 'react';

type QuestionInterfaceProps = {
  quest: string;
  typeQuest: string;
};

const QuestionInterface = ({ quest, typeQuest }: QuestionInterfaceProps) => {
  return (
    <React.Fragment>
      <p>{quest}</p>
    </React.Fragment>
  );
};

export default QuestionInterface;
