import React, {useState} from 'react';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import * as CONST from "../constants";
import {TextQuestion} from "../components/TextQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const RSSurvey = ({onNextChange}) => {
    const [rs11, setRs11] = useState(1);
    const [rs12, setRs12] = useState(1);
    const [rs13, setRs13] = useState(1);
    const [rs14, setRs14] = useState(1);
    const [rs15, setRs15] = useState(1);

    const onClickNext = () => {
        onNextChange({rs11, rs12, rs13})
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
                THE INVESTMENT GAME
            </div>
            <MainContent>
                <StyledIntro>
                    Na skali od 1 do 5 ocenite sledeće konstatacije. Ocena 1 Apsolutno se ne slažem, ocena 5 Apsolutno
                    se
                    slažem.
                </StyledIntro>
                <Auto5RadioQuestion
                    question="Sklon sam ulaganju značajnih novčanih sredstava u investicije sa visokim rizikom."
                    value={rs11}
                    handleInputChange={(value) => {
                        setRs11(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Sebe mogu okarakterisati kao osobu koja voli da preuzima finansijske rizike."
                    value={rs12}
                    handleInputChange={(value) => {
                        setRs12(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Čak i kada bih prošao sa značajnim gubitkom u nekoj investiciji, i dalje bih razmišljao o ulaganjima u rizičnu aktivu."
                    value={rs13}
                    handleInputChange={(value) => {
                        setRs13(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                >
                    Next
                </StyledButton>
            </MainContent>
        </StyledContainer>
    )
}
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