import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

export default function InputSlider({
                                        initCashBalance,
                                        initValue,
                                        name,
                                        handleOnChange
                                    }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(initValue);
    useEffect(() => {
        setValue(initValue);
    }, [initValue])
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        handleOnChange(newValue);
    };

    // const handleInputChange = (event) => {
    //     const newValue = event.target.value === '' ? '' : Number(event.target.value);
    //     setValue(newValue);
    //     handleOnChange(newValue);
    // };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2} alignItems="center">
                {name}
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={initCashBalance*value/100}
                        margin="dense"
                        // onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}
