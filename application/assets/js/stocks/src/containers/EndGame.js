import React from 'react';
import styled from 'styled-components';
import {Button} from "@material-ui/core";

export const EndGame = ({onNextClick, title, gain}) => (
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
            <div style={{fontSize:'20px'}}>
                {title}
            </div>
            <div style={{fontSize:'20px'}}>
                Osvojili ste <b>{(gain - 1000).toFixed(2 ?? 0)}</b> novcanih jedinica.
            </div>
            <Button
                style={{marginTop:'50px'}}
                variant="contained"
                onClick={onNextClick}
                color="primary"
            >
                Dalje
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