import React, { useState, useEf, useEffect } from 'react'
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';


const EditUser = () => {

    let nav = useNavigate();
    let dispatch = useDispatch();


    const [state, setState] = useState({
        name: "",
        email: "",
        address: ""
    });
    const [error, setError] = useState("");

    let { id } = useParams();
    const { user } = useSelector((state) => state.data);
    const { name, email, address } = state;

    useEffect(() => {
        dispatch(getSingleUser(id))
    }, []);

    useEffect(() => {
        if (user) {
            setState({ ...user })
        }
    }, [])

    const handdleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }


    const handdleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !address) {
            setError('error input')
        } else {

            dispatch(updateUser(state, id));
            nav('/');
            setError("");

        }





    }
    return (
        <div>
            <h2 align='center'>Edit User </h2>
            {error && <h3 style={{ color: 'red' }}> </h3>}

            <Box m='auto' display="flex" component="form" onSubmit={handdleSubmit} sx={{ '& > :not(style)': { m: 1, width: '45ch' } }} noValidate autoComplete="off">
                <TextField id="outlined-basic" name='name' label="Name" variant="outlined" value={name || ""} type='text' onChange={handdleInput} /><br />

                <TextField id="outlined-basic" label="Email" name='email' variant="outlined" value={email || ""} type='text' onChange={handdleInput} /><br />

                <TextField id="outlined-basic" label="Address" name='address' variant="outlined" value={address || ""} type='text' onChange={handdleInput} /><br />

                <Button variant='contained' color="primary" type='submit'> Update </Button>
                <Button variant='contained' color="primary" onClick={() => { nav('/') }}> Go Back </Button>


            </Box>


        </div>


    )
}

export default EditUser