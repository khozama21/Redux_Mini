import React, { useEffect } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/actions';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const buttons = [
    <Button key="one">One</Button>,
    <Button key="two">Two</Button>,

];


const Home = () => {
    let dispatch = useDispatch();

    const { users } = useSelector(state => state.data);

    let nav = useNavigate();


    useEffect(() => {

        dispatch(loadUsers());

    }, []);

    const handleDelete = (id) => {

        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }



    };

    return (

        <div>



            <TableContainer component={Paper}>
                <h2 style={{ textAlign: 'center' }}> Users </h2>

                <Box  display="flex" container justifyContent="center"  >

                    <Button  m="auto" variant='outlined' color="primary" onClick={() => { nav('/addUser') }}>Add User </Button>
                </Box>


                <Table sx={{ minWidth: 700, marginTop: 20 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Address&nbsp;</StyledTableCell>

                            <StyledTableCell align="center">Action&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button style={{ marginRight: "5px" }}
                                            color="error"
                                            onClick={() => { handleDelete(user.id) }}>Delete</Button>
                                        <Button onClick={()=>nav(`/editUser/${user.id}`)}>Edit</Button>

                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    )
}

export default Home