import React, {useState} from 'react';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import * as CONST from "../constants";
import {TextQuestion} from "../components/TextQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const RegretSurvey = ({onNextChange}) => {
    const [ks1, setKs1] = useState(null);
    const [ks2, setKs2] = useState(null);
    const [ks3, setKs3] = useState(null);
    const [ks4, setKs4] = useState(null);
    const [ks5, setKs5] = useState(null);
    const [ks6, setKs6] = useState(null);
    const [ks7, setKs7] = useState(null);

    const onClickNext = () => {
        onNextChange({ks1, ks2, ks3, ks4, ks5, ks6, ks7})
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
                    value={ks1}
                    handleInputChange={(value) => {
                        setKs1(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada pogledam svoj finansijski rezultat koji sam ostvario u prethodnim periodima odlučivanja sklon sam razmišljanju o alternativama koje sam propustio."
                    value={ks2}
                    handleInputChange={(value) => {
                        setKs2(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Jednom kada donesem finansijsku odluku ne osvrćem se unazad. "
                    value={ks3}
                    handleInputChange={(value) => {
                        setKs3(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kada donesem finansijsku odluku, veoma sam radoznao da saznam šta bi se desilo da je izbor investicionih alternativa bio drugačiji."
                    value={ks4}
                    handleInputChange={(value) => {
                        setKs4(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Ukoliko se ispostavi da je ulaganje u akcije bilo pogrešno, osećaću se loše."
                    value={ks5}
                    handleInputChange={(value) => {
                        setKs5(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Ukoliko donesem dobru finansijsku odluku, ali se ispostavi da bi neki drugačiji izbor doneo više prinose, osećaću se loše."
                    value={ks6}
                    handleInputChange={(value) => {
                        setKs6(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Kajem se zbog izbora koje sam napravio u prethodnim periodima odlučivanja."
                    value={ks7}
                    handleInputChange={(value) => {
                        setKs7(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!ks1 || !ks2 || !ks3 || !ks4 || !ks5 || !ks6 || !ks7}
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
export default RegretSurvey;