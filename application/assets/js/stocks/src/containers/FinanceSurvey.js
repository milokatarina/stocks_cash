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
                    Na skali od 1 do 5 ocenite sledeće konstatacije.
                    Ocena 1 <b>Apsolutno se ne slažem</b>, ocena 5 <b>Apsolutno se slažem</b>.
                </StyledIntro>
                <CustomRadioQuestion
                    labels={CONST.FIN_1}
                    question="Najlikvidnija aktiva od nabrojanih je"
                    value={fs1}
                    handleInputChange={(value) => {
                        if (value === 4) {
                            setFs1(1);
                        } else {
                            setFs1(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_2}
                    question="Uzimajući u obzir duži vremenski period (10-20 godina), koja od navedenih aktiva najčešće vodi do najvišeg prinosa?"
                    value={fs2}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs2(1);
                        } else {
                            setFs2(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_3}
                    question="Kada investitor rasporedi svoj novac na veliki broj različitih oblika aktive, šta se dešava sa rizikom da će izgubiti novac:"
                    value={fs3}
                    handleInputChange={(value) => {
                        if (value === 1) {
                            setFs3(1);
                        } else {
                            setFs3(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_4}
                    question="Ukoliko dođe do pada kamatnih stopa, šta se dešava sa cenom obveznica?"
                    value={fs4}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs4(1);
                        } else {
                            setFs4(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_5}
                    question="Ukoliko pođemo od pretpostavke da će se u 2022. godini Vaša primanja udvostručiti, ali će uporedo doći i do dupliranja  cena svih dobara, koliko ćete biti u mogućnosti da kupujete u 2022. godini?"
                    value={fs5}
                    handleInputChange={(value) => {
                        if (value === 3) {
                            setFs5(1);
                        } else {
                            setFs5(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_6}
                    question="Pretpostavimo da kamatna stopa na depozite kod banke iznosi 1%, dok je stopa inflacije u toku godine 2%. Šta je Vaše mišljenje: Da li ćete posle godinu dana sa sredstvima koja su na Vašem depozitnom računu moći da kupujete?"
                    value={fs6}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs6(1);
                        } else {
                            setFs6(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_7}
                    question="Koja od navedenih aktiva ispoljava najveći stepen fluktuacije tokom vremena:"
                    value={fs7}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs7(1);
                        } else {
                            setFs7(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_8}
                    question="Ukoliko neko kupi akciju kompanije B na berzi:"
                    value={fs8}
                    handleInputChange={(value) => {
                        if (value === 1) {
                            setFs8(1);
                        } else {
                            setFs8(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_9}
                    question="Ukoliko neko kupi obveznicu kompanije A na berzi:"
                    value={fs9}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs9(1);
                        } else {
                            setFs9(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_10}
                    question="Koja od navedenih grupa ljudi potencijalno može imati najviše novčanih poteškoća tokom perioda visoke inflacije koja traje nekoliko godina?"
                    value={fs10}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs10(1);
                        } else {
                            setFs10(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_11}
                    question="Šta od navedenog nije obično povezano sa potrošnjom?"
                    value={fs11}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs11(1);
                        } else {
                            setFs11(0);
                        }
                    }}
                />
                <CustomRadioQuestion
                    labels={CONST.FIN_12}
                    question="Šta je od navedenog o investicionim fondovima tačno?"
                    value={fs12}
                    handleInputChange={(value) => {
                        if (value === 2) {
                            setFs12(1);
                        } else {
                            setFs12(0);
                        }
                    }}
                />
                <StyledButton
                    variant="contained"
                    onClick={onClickNext}
                    color="primary"
                    disabled={fs1 === null || fs2 === null || fs3 === null
                    || fs4 === null || fs5 === null || fs6 === null || fs7 === null || fs8 === null || fs9 === null || fs10 === null || fs11 === null
                    || fs12 === null}
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