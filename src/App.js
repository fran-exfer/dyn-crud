import * as React from 'react';
import { useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    padding: 24,
  },
});

function App() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://dyn-crud.herokuapp.com/api/users/')
      .then((res) => res.json())
      .then((data) => {
        setRows(data);
      });
  }, []);

  return (
    <Container>
      <Card className={classes.card} variant="outlined">
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h5" component="h1">
              Dyn CRUD
            </Typography>
            <Typography variant="subtitle1">
              A simple CRUD with the MERN stack
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
            >
              New Record
            </Button>
          </Box>
        </Box>

        <Box mb={2}>
          <TextField
            id="search-input"
            label="Search"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    {new Date(user.registrationDate).toLocaleString('en-GB')}
                  </TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default App;
