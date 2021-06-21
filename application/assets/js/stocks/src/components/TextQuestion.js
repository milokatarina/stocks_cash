import React, {useState} from 'react';
import styled from 'styled-components';
import Input from "@material-ui/core/Input";

export const TextQuestion = ({question, handleInputChange, inputType}) => {
    const [textValue, setTextValue] = useState(null);
    return (<MainContent>
            <StyledQuestionTitle>{question}</StyledQuestionTitle>
            <Input
                style={{width: '300px'}}
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
  margin: 20px auto 20px auto;
  padding: 10px;
`;
const StyledQuestionTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;