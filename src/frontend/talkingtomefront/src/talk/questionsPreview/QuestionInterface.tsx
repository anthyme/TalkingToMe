import React from 'react';
import {
  makeStyles,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

type QuestionInterfaceProps = {
  quest: string;
  typeQuest: string;
  correctAn: string;
  answers: { response: string }[];
};

const QuestionInterface = ({
  quest,
  typeQuest,
  answers,
  correctAn,
}: QuestionInterfaceProps) => {
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
  const isUCQ = typeQuest === 'UCQ';

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
                    correctAn === ((a as unknown) as string) ? true : false //typescript shenanigans to compare to string that aren't overlapping
                  }
                  control={<Radio />}
                  label=""
                  disabled={true}
                />
                {a}
              </div>
            ))}
          </RadioGroup>
        ) : (
          <textarea
            value="Answer placeholder"
            disabled={true}
            rows={5}
            cols={100}
            style={{ resize: 'none' }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default QuestionInterface;
