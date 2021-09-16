import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const OptSurvey = ({onNextChange}) => {
    const [os1, setOs1] = useState(null);
    const [os2, setOs2] = useState(null);
    const [os3, setOs3] = useState(null);
    const [os4, setOs4] = useState(null);
    const [os5, setOs5] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const onClickNext = () => {
        onNextChange({os1, os2, os3, os4, os5})
    }
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
                <StyledIntro>
                    Na skali od 1 do 5 ocenite sledeće konstatacije.
                    Ocena 1 <b>Apsolutno se ne slažem</b>, ocena 5 <b>Apsolutno se slažem</b>.
                </StyledIntro>
                <Auto5RadioQuestion
                    question="U planu mi je da povećam ulaganja u akcije u narednom periodu"
                    value={os1}
                    handleInputChange={(value) => {
                        setOs1(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Pre nego što donesem odluku o ulaganju u jednu od investicionih alternativa, najviše razmišljam o potencijalnim dobicima"
                    value={os2}
                    handleInputChange={(value) => {
                        setOs2(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Moje viđenje tržišta akcija u narednom periodu je optimistično"
                    value={os3}
                    handleInputChange={(value) => {
                        setOs3(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Verujem da će prinosi na akcije da rastu u narednom periodu"
                    value={os4}
                    handleInputChange={(value) => {
                        setOs4(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Očekujem visoke prinose na moja ulaganja u budućim periodima"
                    value={os5}
                    handleInputChange={(value) => {
                        setOs5(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!os1 || !os2 || !os3 || !os4 || !os5}
                >
                    Dalje
                </StyledButton>
            </MainContent>
        </StyledContainer>
    )
}
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
const StyledIntro = styled.div`
  margin: 12px auto;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  padding-top: 22px;
  position: relative;
  width: 500px;
`;
export default OptSurvey;