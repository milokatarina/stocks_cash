import React, {useEffect, useState} from 'react';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import * as CONST from "../constants";
import {TextQuestion} from "../components/TextQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const RSSurvey = ({onNextChange}) => {
    const [rs1, setRs1] = useState(null);
    const [rs2, setRs2] = useState(null);
    const [rs3, setRs3] = useState(null);
    const [rs4, setRs4] = useState(null);
    const [rs5, setRs5] = useState(null);
    const [rs6, setRs6] = useState(null);
    const [rs7, setRs7] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const onClickNext = () => {
        onNextChange({rs1, rs2, rs3, rs4, rs5, rs6, rs7})
    }
    return (
        <StyledContainer>
            <div className="mainHeader">
                EKSPERIMENTALNO ULAGANJE
            </div>
            <MainContent>
                <StyledIntro>
                    Na skali od 1 do 5 ocenite sledeće konstatacije.
                    Ocena 1 <b>Apsolutno se ne slažem</b>, ocena 5 <b>Apsolutno se slažem</b>.
                </StyledIntro>
                <Auto5RadioQuestion
                    question="Sklon sam ulaganju novčanih sredstava u investicije sa visokim rizikom"
                    value={rs1}
                    handleInputChange={(value) => {
                        setRs1(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Sebe mogu okarakterisati kao osobu koja voli da preuzima finansijske rizike"
                    value={rs2}
                    handleInputChange={(value) => {
                        setRs2(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Čak i kada bih prošao sa velikim gubitkom u nekoj investiciji, i dalje bih razmišljao o ulaganjima u rizičnu aktivu"
                    value={rs3}
                    handleInputChange={(value) => {
                        setRs3(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada je novac u pitanju, spreman sam da rizikujem"
                    value={rs4}
                    handleInputChange={(value) => {
                        setRs4(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Smatram da se ne treba izlagati finansijskim rizicima"
                    value={rs5}
                    handleInputChange={(value) => {
                        setRs5(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Činjenica da visoki prinosi mogu da se ostvare uz visoke rizike mi pruža dodatni podstrek za ulaganje u rizičnu aktivu"
                    value={rs6}
                    handleInputChange={(value) => {
                        setRs6(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Nastojim da biram kompleksne, visoko rizične, investicione strategije kako bih ostvario visok prinos"
                    value={rs7}
                    handleInputChange={(value) => {
                        setRs7(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!rs1 || !rs2 || !rs3 || !rs4 || !rs5 || !rs6 || !rs7}
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
export default RSSurvey;