import React, {useState} from 'react';
import styled from 'styled-components';
import {FormControl, Radio, RadioGroup, FormControlLabel} from "@material-ui/core";
import * as CONST from "../constants";

export const Auto5RadioQuestion = ({question, handleInputChange}) => {
   const answers = CONST.fiveAnswers;

    const [radioValue, setRadioValue] = useState(answers[0].value);
    const preparedAnswers = answers.map((item) => (<FormControlLabel value={item.value} control={<Radio/>}
                                                                     label={item.label}/>));

    return (<StyledContainer>
            <StyledTitle>
                {question}:
            </StyledTitle>
            <StyledAnswers>
                <FormControl component="fieldset" style={{textAlign: 'left'}}>
                    <RadioGroup row value={radioValue}
                                onChange={(event) => {
                                    setRadioValue(parseInt(event.target.value));
                                    handleInputChange(parseInt(event.target.value));
                                }}>
                        {preparedAnswers}
                    </RadioGroup>
                </FormControl>
            </StyledAnswers>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
  margin: 20px auto;
  width: 500px;
  -webkit-transition: background-color 200ms cubic-bezier(0.0,0.0,0.2,1);
  transition: background-color 200ms cubic-bezier(0.0,0.0,0.2,1);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  page-break-inside: avoid;
  word-wrap: break-word;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 25px;
`;

const StyledAnswers = styled.div`
`;