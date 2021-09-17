import React, {Component, useEffect, useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Radio} from "@material-ui/core";
import styled from "styled-components";

class FinanceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: []
        }
    }

    toggleAnswers = (value) => {
        const newAnswers = this.state.answers;
        if (newAnswers.length === 2 && newAnswers.indexOf(value) !== -1) {
            newAnswers.splice(newAnswers.indexOf(value), 1)
        } else if (newAnswers.length < 2) {
            if (newAnswers.indexOf(value) === -1) {
                newAnswers.push(parseInt(value));
            } else {
                newAnswers.splice(newAnswers.indexOf(value), 1)
            }
        }
        this.setState({
            answers: newAnswers
        }, () => {
            console.log('setovano');
        })
    }

    render() {
        console.log('render');
        return (
            <StyledContainer>
                <StyledTitle>
                    Dopunski izvor finansiranja tokom studija (zaokružiti dva odgovora):
                </StyledTitle>
                <StyledAnswers>
                    <FormControlLabel value={1} control={<Checkbox
                        disabled={this.state.answers.length === 2 && this.state.answers.indexOf(1) === -1}
                        onChange={() => this.toggleAnswers(1)}
                        name={1}
                        color="primary"
                    />} label="Studentski krediti i stipendije"/>
                    <FormControlLabel
                        value={2} control={<Checkbox
                        disabled={this.state.answers.length === 2 && this.state.answers.indexOf(2) === -1}
                        onChange={() => this.toggleAnswers(2)}
                        name={2}
                        color="primary"
                    />} label="Lična primanja"/>
                    <FormControlLabel value={3} control={<Checkbox
                        disabled={this.state.answers.length === 2 && this.state.answers.indexOf(3) === -1}
                        onChange={() => this.toggleAnswers(3)}
                        name={3}
                        color="primary"
                    />} label="Izdržavanje od strane roditelja/rođaka"/>
                    <FormControlLabel value={4} control={<Checkbox
                        disabled={this.state.answers.length === 2 && this.state.answers.indexOf(4) === -1}
                        onChange={() => this.toggleAnswers(4)}
                        name={4}
                        color="primary"
                    />} label="Ušteđevina"/>
                </StyledAnswers>
            </StyledContainer>
        )
    }
}

const StyledContainer = styled.div`
  margin: 20px auto;
  width: 500px;
  -webkit-transition: background-color 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
  transition: background-color 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 24px;
  page-break-inside: avoid;
  word-wrap: break-word;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 25px;
`;

const StyledAnswers = styled.div`
`;
export default FinanceQuestion;