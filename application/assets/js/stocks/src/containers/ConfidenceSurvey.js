import React, {useState} from 'react';
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const ConfidenceSurvey = ({onNextChange}) => {
    const [cs1, setCs1] = useState(null);
    const [cs2, setCs2] = useState(null);
    const [cs3, setCs3] = useState(null);
    const [cs4, setCs4] = useState(null);
    const [cs5, setCs5] = useState(null);

    const onClickNext = () => {
        onNextChange({cs1, cs2, cs3, cs4, cs5})
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
                    Na skali od 1 do 5 ocenite sledeće konstatacije.
                    Ocena 1 <b>Apsolutno se ne slažem</b>, ocena 5 <b>Apsolutno se slažem</b>.
                </StyledIntro>
                <Auto5RadioQuestion
                    question="Finansijski rezultat koji sam ostvario u prethodnim periodima investicionih ulaganja u igri odraz je mojih specifičnih veština i sposobnosti"
                    value={cs1}
                    handleInputChange={(value) => {
                        setCs1(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Verujem da u značajnoj meri mogu predvideti budući trend kretanja prinosa na akcije"
                    value={cs2}
                    handleInputChange={(value) => {
                        setCs2(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Smatram da su moje odluke u prethodnim ulaganjima bile ispravne"
                    value={cs3}
                    handleInputChange={(value) => {
                        setCs3(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Preuzimam punu kontrolu i odgovornost za rezultate sopstvenih investicionih odluka"
                    value={cs4}
                    handleInputChange={(value) => {
                        setCs4(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Verujem da imam bolje sposobnosti u izboru investicionih alternativa od ostalih"
                    value={cs5}
                    handleInputChange={(value) => {
                        setCs5(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!cs1 || !cs2 || !cs3 || !cs4 || !cs5}
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
export default ConfidenceSurvey;