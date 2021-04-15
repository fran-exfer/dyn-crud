import * as React from 'react';
import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/styles';

import Header from './components/Header';
import Search from './components/Search';
import DataTable from './components/DataTable';
import UserDialog from './components/UserDialog';

const useStyles = makeStyles({
  card: {
    padding: 24,
  },
});

function App() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState(null);

  useEffect(() => {
    fetch('https://dyn-crud.herokuapp.com/api/users/')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);

    // Prevent pagination to show a page that doesn't exist
    if (event.target.value.length >= 3) {
      setPage(0);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNewDialog = (event, user) => {
    setDialogUser(user);
    setDialogOpen(true);
  };

  const handleCancelDialog = (event) => {
    setDialogOpen(false);
  };

  const handleDelete = (event, user) => {
    fetch(`https://dyn-crud.herokuapp.com/api/users/${user._id}`, {
      method: 'DELETE',
    }).then(() => {
      setUsers((users) => users.filter((u) => u._id !== user._id));
      if (users.length === page * rowsPerPage + 1) {
        setPage((current) => current - 1);
      }
    });
  };

  return (
    <Container>
      <Card className={classes.card} variant="outlined">
        <Header onButtonClick={handleNewDialog} />
        <Search search={search} handleChangeSearch={handleChangeSearch} />
        <DataTable
          users={users}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleNewDialog={handleNewDialog}
          handleDelete={handleDelete}
          search={search}
        />
      </Card>

      <UserDialog
        dialogOpen={dialogOpen}
        handleCancelDialog={handleCancelDialog}
        user={dialogUser}
        users={users}
        setUsers={setUsers}
        setDialogOpen={setDialogOpen}
      />
    </Container>
  );
}

export default App;
