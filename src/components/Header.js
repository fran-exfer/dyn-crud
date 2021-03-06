import * as React from 'react';
import { useContext } from 'react';

import AppContext from '../utils/AppContext';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function Header() {
  const [, dispatch] = useContext(AppContext);

  const handleClick = () => dispatch({ type: 'dialog/new' });

  return (
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
          onClick={handleClick}
        >
          New Record
        </Button>
      </Box>
    </Box>
  );
}
