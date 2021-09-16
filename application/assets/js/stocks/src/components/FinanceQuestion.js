import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Radio} from "@material-ui/core";
import styled from "styled-components";

const FinanceQuestion = ({labels, handleInputChanges}) => {
    const [answers, setAnswers] = useState([]);

    const toggleAnswers = (value) => {
        const newAnswers = answers;
        if (newAnswers.length === 2 && newAnswers.indexOf(value) !== -1) {
            newAnswers.splice(newAnswers.indexOf(value), 1)
        } else if (newAnswers.length < 2) {
            if (newAnswers.indexOf(value) === -1) {
                newAnswers.push(parseInt(value));
            } else {
                newAnswers.splice(newAnswers.indexOf(value), 1)
            }
        }
        setAnswers(newAnswers);
    }

    useEffect(() => {
        return () => {
            effect
        };
    }, [answers]);


    const preparedAnswers = labels.map((label, index) => {
        return {
            value: index + 1,
            label: label
        }
    });


    const renderCheckboxes = preparedAnswers.map((item) => {
        console.log(item);
        return <FormControlLabel value={item.value} control={<Checkbox
        checked={answers.indexOf(parseInt(item.value)) !== -1}
        onChange={() => toggleAnswers(item.value)}
        name={item.label}
        color="primary"
    />} label={item.label}/>});

    return (
        <StyledContainer>
            <StyledTitle>
                Dopunski izvor finansiranja tokom studija (zaokružiti dva odgovora):
            </StyledTitle>
            <StyledAnswers>
                {renderCheckboxes}
            </StyledAnswers>
        </StyledContainer>
    );
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