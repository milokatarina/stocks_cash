import React, {useState} from 'react';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import * as CONST from "../constants";
import {TextQuestion} from "../components/TextQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const FinanceSurvey = ({onNextChange}) => {
    const [fs1, setFs1] = useState(null);
    const [fs2, setFs2] = useState(null);
    const [fs3, setFs3] = useState(null);
    const [fs4, setFs4] = useState(null);
    const [fs5, setFs5] = useState(null);
    const [fs6, setFs6] = useState(null);
    const [fs7, setFs7] = useState(null);
    const [fs8, setFs8] = useState(null);
    const [fs9, setFs9] = useState(null);
    const [fs10, setFs10] = useState(null);
    const [fs11, setFs11] = useState(null);
    const [fs12, setFs12] = useState(null);

    const onClickNext = () => {
        onNextChange({fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12})
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
                IGRA INVESTICIJA
            </div>
            <MainContent>
                <StyledIntro>
                    Na skali od 1 do 5 ocenite sledeće konstatacije. Ocena 1 Apsolutno se ne slažem, ocena 5 Apsolutno
                    se slažem.
                </StyledIntro>
                <Auto5RadioQuestion
                    question="Kada donosim finansijsku odluku sklon sam osvrtanju na ishode svojih prethodno donetih finansijskih odluka."
                    value={fs1}
                    handleInputChange={(value) => {
                        setFs1(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada pogledam svoj finansijski rezultat koji sam ostvario u prethodnim periodima odlučivanja sklon sam razmišljanju o alternativama koje sam propustio."
                    value={fs2}
                    handleInputChange={(value) => {
                        setFs2(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Jednom kada donesem finansijsku odluku ne osvrćem se unazad. "
                    value={fs3}
                    handleInputChange={(value) => {
                        setFs3(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada donesem finansijsku odluku, veoma sam radoznao da saznam šta bi se desilo da je izbor investicionih alternativa bio drugačiji."
                    value={fs4}
                    handleInputChange={(value) => {
                        setFs4(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Ukoliko se ispostavi da je ulaganje u akcije bilo pogrešno, osećaću se loše."
                    value={fs5}
                    handleInputChange={(value) => {
                        setFs5(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Ukoliko donesem dobru finansijsku odluku, ali se ispostavi da bi neki drugačiji izbor doneo više prinose, osećaću se loše."
                    value={fs6}
                    handleInputChange={(value) => {
                        setFs6(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs7}
                    handleInputChange={(value) => {
                        setFs7(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs8}
                    handleInputChange={(value) => {
                        setFs8(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs9}
                    handleInputChange={(value) => {
                        setFs9(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs10}
                    handleInputChange={(value) => {
                        setFs10(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs11}
                    handleInputChange={(value) => {
                        setFs11(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={fs12}
                    handleInputChange={(value) => {
                        setFs12(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!fs1 || !fs2 || !fs3 || !fs4 || !fs5 || !fs6 || !fs7 || !fs8 || !fs9 || !fs10 || !fs11 || !fs12}
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
export default FinanceSurvey;