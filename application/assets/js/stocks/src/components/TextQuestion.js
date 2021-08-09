import React, {useState} from 'react';
import styled from 'styled-components';
import Input from "@material-ui/core/Input";

export const TextQuestion = ({question, handleInputChange, inputType}) => {
    const [textValue, setTextValue] = useState(null);
    return (<MainContent>
            <StyledQuestionTitle>{question}</StyledQuestionTitle>
            <Input
                style={{width: '400px'}}
                value={textValue}
                margin="dense"
                onChange={(event) => {
                    setTextValue(event.target.value);
                    handleInputChange(event.target.value)
                }}
                inputProps={{
                    type: inputType
                }}
            />
        </MainContent>
    )
};

const MainContent = styled.div`
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
const StyledQuestionTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;