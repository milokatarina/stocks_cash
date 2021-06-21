import React from 'react';
import styled from 'styled-components';

export const EndGame = () => (
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