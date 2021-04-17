import * as React from 'react';
import { useReducer, useEffect } from 'react';

import * as api from './utils/api';
import appReducer from './utils/appReducer';
import AppContext from './utils/AppContext';

import Header from './components/Header';
import Search from './components/Search';
import DataTable from './components/DataTable';
import UserDialog from './components/UserDialog';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    padding: 24,
  },
});

function App() {
  const classes = useStyles();

  /*
   * A reducer lets us abstract a lot of logic into more readable
   * and mantainable actions. We'll pass the state dispatch function
   * across our app with React's Context API.
   */
  const [state, dispatch] = useReducer(appReducer, {
    users: [],
    loading: true,
    error: null,
    page: 0,
    rowsPerPage: 10,
    search: '',
    isDialogOpen: false,
    dialogCurrentUser: null,
  });

  /*
   * On app load, and only on load, fetch all users and store them
   * in the state.
   */
  useEffect(() => {
    api
      .getAllUsers()
      .then((fetchedUsers) =>
        dispatch({
          type: 'users/firstLoad',
          fetchedUsers,
        })
      )
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Container>
        <Card className={classes.card} variant="outlined">
          <Header />
          <Search />
          <DataTable />
        </Card>

        <UserDialog />
      </Container>
    </AppContext.Provider>
  );
}

export default App;
