import React from 'react';
import {Auto5RadioQuestion} from "./Auto5RadioQuestion";
import styled from "styled-components";
import {Button} from "@material-ui/core";

export const RiskPerception = ({currentYear, setIsRiskPercVisible, setRp, invest, onBack, text}) => {
    return (
        <StyledContainer>
            <div className="mainHeader">
                {text} ({currentYear}.GODINA)
            </div>
            <Auto5RadioQuestion
                question="Koliko rizičnim percipirate Vaše prethodno ulaganje"
                value={null}
                handleInputChange={(value) => {
                    setRp(value);
                    setIsRiskPercVisible(false)
                    invest({risk: value});
                }}
                showDescription={true}
            />
            <StyledButton
                variant="contained"
                onClick={onBack}
                color="primary"
            >
                NAZAD
            </StyledButton>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
     margin: 50px;
     border: 1px solid #ccc;
     border-radius: 3px;
`;

const StyledButton = styled(Button)`
  margin-left: 50px !important;
  margin-bottom: 25px !important;
`