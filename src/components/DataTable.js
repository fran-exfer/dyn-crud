import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DataTable({
  users,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleNewDialog,
  handleDelete,
  search,
}) {
  // First, get users data from props
  let rows = users;

  // If there's at least 3 chars at search bar, filter the array
  // Will stay as it is if nothing is searched
  if (search.length >= 3) {
    const s = search.toLowerCase();
    rows = users.filter(
      (user) =>
        user.username.toLowerCase().includes(s) ||
        user.fullname.toLowerCase().includes(s) ||
        user.email.toLowerCase().includes(s) ||
        user.address.toLowerCase().includes(s)
    );
  }

  // Return a new, paginated array, which will show at the table
  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
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
            {paginatedRows.map((user) => (
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
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={(event) => handleNewDialog(event, user)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={(event) => handleDelete(event, user)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="nav"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
