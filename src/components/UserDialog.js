import * as React from 'react';
import { useState, useContext, useEffect } from 'react';

import AppContext from '../utils/AppContext';
import * as api from '../utils/api';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function UserDialog() {
  const [state, dispatch] = useContext(AppContext);
  const { dialogCurrentUser } = state;

  // This is a controlled form.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('pending');

  /*
   * If a user is provided for the dialog, we're in edit mode. If no user
   * is specified, we're creating a new one. When opening the dialog, we
   * should pass it either a user or a falsy value (such as null).
   */
  useEffect(() => {
    if (dialogCurrentUser) {
      setUsername(dialogCurrentUser.username);
      setEmail(dialogCurrentUser.email);
      setFullname(dialogCurrentUser.fullname);
      setAddress(dialogCurrentUser.address);
      setStatus(dialogCurrentUser.status);
    } else {
      setUsername('');
      setEmail('');
      setFullname('');
      setAddress('');
      setStatus('pending');
    }
  }, [dialogCurrentUser]);

  /*
   * On submit, create a new user or edit an existing user.
   */
  const handleSubmit = () => {
    const body = JSON.stringify({
      username,
      fullname,
      email,
      address,
      status,
    });

    if (dialogCurrentUser) {
      // Editing an existing user
      api
        .updateUser(dialogCurrentUser, body)
        .then((user) => dispatch({ type: 'users/update', user }))
        .catch((error) => console.error(error.message));
    } else {
      // Adding a user
      api
        .createUser(body)
        .then((user) => dispatch({ type: 'users/create', user }))
        .catch((error) => console.error(error.message));
    }
    dispatch({ type: 'dialog/close' });
  };

  /*
   * Close handler
   */
  const handleClose = () => {
    dispatch({ type: 'dialog/close' });
  };

  /*
   * Render
   */
  return (
    <Dialog open={state.isDialogOpen} onClose={handleClose}>
      <DialogTitle>
        {dialogCurrentUser
          ? `Edit user "${dialogCurrentUser.username}"`
          : 'Add new user'}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" mb={1}>
          <Box mr={3} flex="1 1 auto">
            <TextField
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              fullWidth
            />
          </Box>
          <Box flex="1 1 auto">
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        <Box mb={3}>
          <TextField
            id="fullname"
            label="Full Name"
            type="text"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            fullWidth
          />
        </Box>

        <Box mb={3}>
          <TextField
            id="address"
            label="Address"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            fullWidth
          />
        </Box>

        <FormControl>
          <InputLabel id="select-label">Status</InputLabel>
          <Select
            labelId="select-label"
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem value={'pending'}>Pending</MenuItem>
            <MenuItem value={'approved'}>Approved</MenuItem>
            <MenuItem value={'banned'}>Banned</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
