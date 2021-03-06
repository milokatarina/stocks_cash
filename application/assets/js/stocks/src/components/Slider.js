import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import {withStyles} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: '70%',
    },
    input: {
        width: 42
    }
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
        setValue(Number(newValue));
        handleOnChange(Number(newValue));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <div className={classes.root}>
            <Grid container alignItems="center">
                {name}
                <Grid item xs style={{marginLeft: '15px', marginRight: '15px'}}>
                    <PrettoSlider
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={(event) => handleSliderChange(event, event.target.value)}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    /> % ({parseFloat((initCashBalance * value / 100).toFixed(2))})
                </Grid>
            </Grid>
        </div>
    );
}

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider)
