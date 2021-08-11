import React, {useState} from 'react';
import styled from 'styled-components';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import {TextQuestion} from "../components/TextQuestion";
import {Button} from "@material-ui/core";
import * as CONST from '../constants';

const DSSurvey = ({onNextChange}) => {
    const [studies, setStudies] = useState(null);
    const [gender, setGender] = useState(null);
    const [age, setAge] = useState(null);
    return (
        <StyledContainer>
            <div className="mainHeader" style={{
                borderTop: 'none',
                borderBottom: 'white',
                border: '1px solid',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                IGRA INVESTICIJA
            </div>
            <MainContent>
                <CustomRadioQuestion
                    labels={CONST.GENDER}
                    question="Pol"
                    value={gender}
                    handleInputChange={(value) => {
                        setGender(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.STUDIES}
                    question="Stepen studija"
                    value={studies}
                    handleInputChange={(value) => {
                        setStudies(value);
                    }}
                />
                <TextQuestion
                    question="Godine starosti"
                    inputType="number"
                    handleInputChange={(value) => {
                        setAge(value);
                    }}/>
                <StyledButton
                    variant="contained"
                    onClick={() => {
                        onNextChange(gender, age, studies)
                    }}
                    color="primary"
                    disabled={age === null}
                >
                    Dalje
                </StyledButton>
            </MainContent>
        </StyledContainer>
    )
};

const StyledContainer = styled.div`
  padding: 50px;
  min-height: 400px;
`;

const MainContent = styled.div`
  margin: auto;
  padding: 50px;
  text-align: center;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #f0f7ff;
`;
const StyledButton = styled(Button)`
  margin-top: 50px;
`;
export default DSSurvey;