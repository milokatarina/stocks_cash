import React, {useState} from 'react';
import styled from 'styled-components';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import {TextQuestion} from "../components/TextQuestion";
import {Button} from "@material-ui/core";
import * as CONST from '../constants';
import FinanceQuestion from "../components/FinanceQuestion";

const DSSurvey = ({onNextChange}) => {
    const [ds1, setDs1] = useState(null);
    const [ds2, setDs2] = useState(null);
    const [ds3, setDs3] = useState(null);
    const [ds4, setDs4] = useState(null);
    const [ds5, setDs5] = useState(null);
    const [ds6, setDs6] = useState(null);
    const [ds7, setDs7] = useState(null);
    const [ds8, setDs8] = useState(null);
    const [ds9, setDs9] = useState(null);
    const [ds10, setDs10] = useState(null);

    return (
        <StyledContainer>
            <div className="mainHeader" style={{
                borderTop: 'none',
                borderBottom: 'white',
                border: '1px solid',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                EKSPERIMENTALNO ULAGANJE
            </div>
            <MainContent>
                <CustomRadioQuestion
                    labels={CONST.GENDER}
                    question="Pol"
                    value={ds1}
                    handleInputChange={(value) => {
                        setDs1(value);
                    }}
                />
                <TextQuestion
                    question="Godine starosti:"
                    inputType="number"
                    handleInputChange={(value) => {
                        setDs2(value);
                    }}/>
                <CustomRadioQuestion
                    labels={CONST.STUDIES_DEGREE}
                    question="Stepen studija"
                    value={ds3}
                    handleInputChange={(value) => {
                        setDs3(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.STUDIES_TITLE}
                    question="Smer studija"
                    value={ds4}
                    handleInputChange={(value) => {
                        setDs4(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FINANCING}
                    question="Način finansiranja studija"
                    value={ds5}
                    handleInputChange={(value) => {
                        setDs5(value);
                    }}
                />
                <FinanceQuestion labels={CONST.STIPENDIES}/>
                <CustomRadioQuestion
                    labels={CONST.LIVING_PLACE}
                    question="Mesto stalnog prebivališta"
                    value={ds7}
                    handleInputChange={(value) => {
                        setDs7(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.YES_NO}
                    question="Da li imate radnog iskustva"
                    value={ds8}
                    handleInputChange={(value) => {
                        setDs8(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.YES_NO}
                    question="Da li ste ikada bili učesnik u nekoj od ekstremnih disciplina (npr. padobranstvo, ronjenje, bandži džamping, rafting…)"
                    value={ds9}
                    handleInputChange={(value) => {
                        setDs9(value);
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.YES_NO}
                    question="Da li ste nekada uložili celokupan džeparac ili zaradu na klađenje u neki od sportskih događaja (npr. košarkaška, fudbal, tenis...)"
                    value={ds10}
                    handleInputChange={(value) => {
                        setDs10(value);
                    }}
                />

                <StyledButton
                    variant="contained"
                    onClick={() => {
                        onNextChange({ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10})
                    }}
                    color="primary"
                    disabled={!ds1 || !ds2 || !ds3 || !ds4 || !ds5 || !ds6 || !ds7 || !ds8 || !ds9 || !ds10}
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