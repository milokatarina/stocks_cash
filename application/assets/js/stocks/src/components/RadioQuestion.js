import React, {useState} from 'react';
import styled from 'styled-components';
import {FormControl, Radio, RadioGroup, FormControlLabel} from "@material-ui/core";

export const RadioQuestion = ({question, answers, handleInputChange}) => {
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
                                    setRadioValue(event.target.value);
                                    handleInputChange(event.target.value);
                                }}>
                        {preparedAnswers}
                    </RadioGroup>
                </FormControl>
            </StyledAnswers>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StyledAnswers = styled.div`
`;