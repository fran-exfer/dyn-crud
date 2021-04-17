import * as React from 'react';
import { useContext } from 'react';
import AppContext from '../utils/AppContext';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

export default function Search() {
  const [state, dispatch] = useContext(AppContext);

  const handleChange = (event) => {
    dispatch({ type: 'search/update', search: event.target.value });
  };

  return (
    <Box mb={2}>
      <TextField
        id="search-input"
        label="Search"
        variant="standard"
        value={state.search}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
