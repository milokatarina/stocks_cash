// import React, {useState} from 'react';
// import Checkbox from '@material-ui/core/Checkbox';
// import {FormControlLabel, Radio} from "@material-ui/core";
//
// const Checkboxes = ({question, labels, handleInputChange, value}) => {
//     const [checked, setChecked] = React.useState(true);
//
//     const handleChange = (event) => {
//         setChecked(event.target.checked);
//     };
//
//     const answers = labels.map((label, index) => {
//         return {
//             value: index + 1,
//             label: label
//         }
//     });
//
//     const [radioValue1, setRadioValue1] = useState(value1);
//     const [radioValue2, setRadioValue2] = useState(value2);
//
//     const preparedAnswers = answers.map((item) => (<FormControlLabel value={item.value} control={<Checkbox
//         checked={answer.checkedB}
//         onChange={handleChange}
//         name={answer.label}
//         color="primary"
//     />}
//                                                                      label={item.label}/>));
//
//     const [state, setState] = React.useState({
//         "krediti": false,
//         "primanja": false,
//         "izdrzavanje": false,
//         "ustedjevina": false
//     });
//
//     const handleChange = (event) => {
//         setState({ ...state, [event.target.name]: event.target.checked });
//     };
//     return (
//         <div>
//             {answers.map((answer) => {
//                 return <FormControlLabel
//                     control={
//                         <Checkbox
//                             checked={answer.checkedB}
//                             onChange={handleChange}
//                             name={answer.label}
//                             color="primary"
//                         />
//                     }
//                     label="Primary"
//                 />
//             })}
//         </div>
//     );
// }
// export default Checkboxes;