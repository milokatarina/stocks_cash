import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const RSSurvey2 = ({onNextChange}) => {
    const [rs8, setRs8] = useState(null);
    const [rs9, setRs9] = useState(null);
    const [rs10, setRs10] = useState(null);
    const [rs11, setRs11] = useState(null);
    const [rs12, setRs12] = useState(null);
    const [rs13, setRs13] = useState(null);
    const [rs14, setRs14] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const onClickNext = () => {
        onNextChange({rs8, rs9, rs10, rs11, rs12, rs13, rs14})
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
                    question="Sklon sam ulaganju novčanih sredstava u investicije sa visokim rizikom"
                    value={rs8}
                    handleInputChange={(value) => {
                        setRs8(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Sebe mogu okarakterisati kao osobu koja voli da preuzima finansijske rizike"
                    value={rs9}
                    handleInputChange={(value) => {
                        setRs9(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Čak i kada bih prošao sa velikim gubitkom u nekoj investiciji, i dalje bih razmišljao o ulaganjima u rizičnu aktivu"
                    value={rs10}
                    handleInputChange={(value) => {
                        setRs10(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada je novac u pitanju, spreman sam da rizikujem"
                    value={rs11}
                    handleInputChange={(value) => {
                        setRs11(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Smatram da se ne treba izlagati finansijskim rizicima"
                    value={rs12}
                    handleInputChange={(value) => {
                        setRs12(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Činjenica da visoki prinosi mogu da se ostvare uz visoke rizike mi pruža dodatni podstrek za ulaganje u rizičnu aktivu"
                    value={rs13}
                    handleInputChange={(value) => {
                        setRs13(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Nastojim da biram kompleksne, visoko rizične, investicione strategije kako bih ostvario visok prinos"
                    value={rs14}
                    handleInputChange={(value) => {
                        setRs14(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!rs8 || !rs9 || !rs10 || !rs11 || !rs12 || !rs13 || !rs14}
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
export default RSSurvey2;