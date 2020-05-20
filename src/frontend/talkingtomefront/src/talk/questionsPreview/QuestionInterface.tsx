import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

type QuestionInterfaceProps = {
  questId: number;
  quest: string;
  typeQuest: string;
  correctAn: string;
  answers: { response: string }[];
  isPreview: boolean;
  addAnswer: Function;
};

const QuestionInterface = ({
  questId,
  quest,
  typeQuest,
  answers,
  correctAn,
  isPreview,
  addAnswer,
}: QuestionInterfaceProps) => { 
  const [response, setResponse] = useState('');
  const isUCQ = typeQuest === 'UCQ';

  const changeTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  const changeCheckBox = (event: any, rep: any) => {
    event.target.checked ? setResponse(rep) : setResponse('');
  };

  useEffect(() => {
    addAnswer(questId, response);
  }, [response]);

  const useStyles = makeStyles((theme) => ({
    typeStyle: {
      textAlign: 'right',
      fontStyle: 'italic',
      color: 'gray',
      fontSize: 'small',
      marginTop: '20px',
    },
    quizzprevDiv: {
      margin: 10,
    },
    questNType: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.quizzprevDiv}>
        <div className={classes.questNType}>
          <p> - {quest}</p>
          {isUCQ ? (
            <p className={classes.typeStyle}>
              This is a unique choice question
            </p>
          ) : (
            <p className={classes.typeStyle}>This is an open question</p>
          )}
        </div>
        {isUCQ ? ( //The following div or textarea are just for preview purpose, hence, their value is useless
          <RadioGroup aria-label="quiz" name="quiz">
            {answers.map((a, key) => (
              <div key={key}>
                <FormControlLabel
                  checked={
                    isPreview
                      ? correctAn === ((a as unknown) as string)
                        ? true
                        : false
                      : response === ((a as unknown) as string) //typescript shenanigans to compare to string that aren't overlapping
                  }
                  control={<Radio />}
                  label=""
                  disabled={isPreview}
                  onChange={(e) => {
                    changeCheckBox(e, a);
                  }}
                />
                {a}
              </div>
            ))}
            {isPreview
              ? <></>
              : <></>}
          </RadioGroup>
        ) : (
          <textarea
            value={isPreview && !response ? 'Answer placeholder' : response}
            disabled={isPreview}
            rows={5}
            cols={100}
            style={{ resize: 'none' }}
            onChange={changeTextArea}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default QuestionInterface;
