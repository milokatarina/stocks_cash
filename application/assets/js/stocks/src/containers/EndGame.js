import React from 'react';
import styled from 'styled-components';
import {Button} from "@material-ui/core";

export const EndGame = ({onNextClick}) => (
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
            End of the game
            <Button
                variant="contained"
                onClick={onNextClick}
                color="primary"
            >
                Next
            </Button>
        </MainContent>
    </StyledContainer>
);

const StyledContainer = styled.div`
  padding: 50px;
  min-height: 300px;
`;

const MainContent = styled.div`
  margin: 50px auto auto auto;
  width: 50%;
  padding: 10px;
  text-align: center;
`;