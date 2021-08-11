import React from 'react';
import styled from 'styled-components';
import {Button} from "@material-ui/core";

export const EndGame = ({onNextClick, title, gain, hasNextButton}) => (
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
            <div style={{fontSize:'20px'}}>
                {title}
            </div>
            <div style={{fontSize: '20px'}}>
                Osvojili ste <b>{(gain - 1000).toFixed(2 ?? 0)}</b> novčanih jedinica.
            </div>
            {hasNextButton && (<Button
                style={{marginTop: '50px'}}
                variant="contained"
                onClick={onNextClick}
                color="primary"
            >
                Dalje
            </Button>)}
        </MainContent>
    </StyledContainer>
);

const StyledContainer = styled.div`
  padding: 50px;
  min-height: 400px;
`;

const MainContent = styled.div`
  margin: 50px auto auto auto;
  width: 50%;
  padding: 10px;
  text-align: center;
`;