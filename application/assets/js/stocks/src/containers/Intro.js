import React, {useState} from 'react';
import styled from 'styled-components';
import {RadioQuestion} from "../components/RadioQuestion";
import {TextQuestion} from "../components/TextQuestion";
import {Button} from "@material-ui/core";
import * as CONST from '../constants';

export const Intro = ({onNextChange}) => {
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(CONST.MALE);
    const [age, setAge] = useState(null);
    const [email, setEmail] = useState(null);
    return (
        <StyledContainer>
            <div className="mainHeader" style={{
                borderTop: 'none',
                borderBottom: 'white',
                border: '1px solid',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                THE INVESTMENT GAME
            </div>
            <MainContent>
                <TextQuestion
                    question="Name:"
                    inputType="text"
                    handleInputChange={(value) => {
                        setName(value);
                    }}/>
                <TextQuestion
                    question="Email:"
                    inputType="email"
                    handleInputChange={(value) => {
                        setEmail(value);
                    }}/>
                <RadioQuestion
                    answers={CONST.GENDER}
                    question="Gender"
                    value={gender}
                    handleInputChange={(value) => {
                        setGender(value);
                    }}
                />
                <TextQuestion
                    question="Age:"
                    inputType="number"
                    handleInputChange={(value) => {
                        setAge(value);
                    }}/>
                <StyledButton
                    variant="contained"
                    onClick={() => {
                        onNextChange(name, email, gender, age)
                    }}
                    color="primary"
                    disabled={name === null || email === null || age === null}
                >
                    Next
                </StyledButton>
            </MainContent>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
  padding: 50px;
  min-height: 300px;
`;

const MainContent = styled.div`
  margin: auto;
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  border-top: none;
`;
const StyledButton = styled(Button)`
  margin-top: 50px;
`;