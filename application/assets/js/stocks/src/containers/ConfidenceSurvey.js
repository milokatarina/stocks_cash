import React, {useState} from 'react';
import {CustomRadioQuestion} from "../components/CustomRadioQuestion";
import * as CONST from "../constants";
import {TextQuestion} from "../components/TextQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";

const ConfidenceSurvey = ({onNextChange}) => {
    const [cs11, setCs11] = useState(null);
    const [cs12, setCs12] = useState(null);
    const [cs13, setCs13] = useState(null);
    const [cs14, setCs14] = useState(null);
    const [cs15, setCs15] = useState(null);

    const onClickNext = () => {
        onNextChange({cs11, cs12, cs13})
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
                    question="Finansijski rezultat koji sam ostvario u prethodnim periodima investicionih ulaganja u igri odraz je mojih specifičnih veština i sposobnosti"
                    value={cs11}
                    handleInputChange={(value) => {
                        setCs11(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Verujem da u značajnoj meri mogu predvideti budući trend kretanja prinosa na akcije"
                    value={cs12}
                    handleInputChange={(value) => {
                        setCs12(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Smatram da su moje odluke u prethodnim ulaganjima bile ispravne"
                    value={cs13}
                    handleInputChange={(value) => {
                        setCs13(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Preuzimam punu kontrolu i odgovornost za rezultate sopstvenih investicionih odluka"
                    value={cs14}
                    handleInputChange={(value) => {
                        setCs14(value);
                    }}
                />
                <Auto5RadioQuestion
                    question="Verujem da imam bolje sposobnosti u izboru investicionih alternativa od ostalih"
                    value={cs15}
                    handleInputChange={(value) => {
                        setCs15(value);
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={!cs11 || !cs12 || !cs13}
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