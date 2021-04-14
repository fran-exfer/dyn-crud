import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';

export default function Search({ search, handleChangeSearch }) {
  return (
    <Box mb={2}>
      <TextField
        id="search-input"
        label="Search"
        variant="standard"
        value={search}
        onChange={handleChangeSearch}
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
