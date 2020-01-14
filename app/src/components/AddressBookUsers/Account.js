import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

export default function Account() {
    const classes = useStyles();
    const [data, setData] = React.useState({
        fname: '',
        lname: '',
        home_phone: 0,
        mobile_phone: 0,
        work_phone: 0,
        city: '',
        state: '',
        postal_code: 0,
        country: ''
    })

    const handleSubmit = (e) => {
        axios({
            method: "post",
            url: `http://localhost:3001/api/contacts`,
            headers: {
                "Accept": 'application/json',
                "Content-type": "application/json"
            },
            data: data
        })
            .then(e => {
                window.History.push("/addressbook")
            })
            .catch(e => console.log(e))
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.width}>
                <form className={classes.input} autoComplete="off" onSubmit={handleSubmit}>
                    <div className={classes.flex}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="fname">First Name</InputLabel>
                            <OutlinedInput
                                required
                                id="fname"
                                name="fname"
                                type="fname"
                                onChange={handleChange}
                                labelWidth={85}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="lname">Last Name</InputLabel>
                            <OutlinedInput
                                required
                                id="lname"
                                name="lname"
                                type="lname"
                                onChange={handleChange}
                                labelWidth={85}
                            />
                        </FormControl>
                    </div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="home_phone">Home Number</InputLabel>
                        <OutlinedInput
                            required
                            id="home_phone"
                            name="home_phone"
                            type="number"
                            onChange={handleChange}
                            labelWidth={115}
                        />
                    </FormControl>
                    <div className={classes.flex}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="mobile_phone">Mobile Number (Optional)</InputLabel>
                            <OutlinedInput
                                required
                                id="mobile_phone"
                                name="mobile_phone"
                                type="number"
                                onChange={handleChange}
                                labelWidth={190}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="work_phone">Work Number (Optional)</InputLabel>
                            <OutlinedInput
                                required
                                id="work_phone"
                                name="work_phone"
                                type="number"
                                onChange={handleChange}
                                labelWidth={180}
                            />
                        </FormControl>
                    </div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="city">City</InputLabel>
                        <OutlinedInput
                            required
                            id="city"
                            name="city"
                            type="city"
                            onChange={handleChange}
                            labelWidth={35}
                        />
                    </FormControl>
                    <div className={classes.flex}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="state">State</InputLabel>
                            <OutlinedInput
                                required
                                id="state"
                                name="state"
                                type="state"
                                onChange={handleChange}
                                labelWidth={45}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="postal_code">Zip Code</InputLabel>
                            <OutlinedInput
                                required
                                id="postal_code"
                                name="postal_code"
                                type="number"
                                onChange={handleChange}
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <OutlinedInput
                            required
                            id="country"
                            name="country"
                            type="country"
                            onChange={handleChange}
                            labelWidth={65}
                        />
                    </FormControl>

                    <Divider />
                    <div className={clsx(classes.buttons, classes.margin, classes.bottom)}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(45),
        },
    },
    content: {
        padding: 10,
        margin: 10
    },
    textField: {
        width: "95%",
    },
    margin: {
        margin: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bottom: {
        marginBottom: 20
    },
    title: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}));