export default function appReducer(state, action) {
  switch (action.type) {
    /*
     * Users actions.
     */
    case 'users/firstLoad':
      return {
        ...state,
        users: action.fetchedUsers,
        loading: false,
        error: null,
      };

    case 'users/create':
      return {
        ...state,
        users: [...state.users, action.user],
      };

    case 'users/update':
      return {
        ...state,
        users: state.users.map((u) =>
          u._id === action.user._id ? action.user : u
        ),
      };

    case 'users/delete':
      return {
        ...state,
        users: state.users.filter((u) => u._id !== action.user._id),
        // Prevent showing a blank page if it's the last user on this one.
        page:
          state.users.length === state.page * state.rowsPerPage + 1
            ? state.page - 1
            : state.page,
      };

    /*
     * Search actions.
     */
    case 'search/update':
      // Prevent pagination to show a page that doesn't exist
      const shouldReturnToPage0 = action.search.length >= 3;

      return {
        ...state,
        search: action.search,
        page: shouldReturnToPage0 ? 0 : state.page,
      };

    /*
     * Pagination actions.
     */
    case 'pagination/changePage':
      return { ...state, page: action.newPage };
    case 'pagination/changeRowsPerPage':
      return { ...state, rowsPerPage: action.newRowsPerPage, page: 0 };

    /*
     * User dialog actions.
     */
    case 'dialog/new':
      return {
        ...state,
        isDialogOpen: true,
        dialogCurrentUser: null,
      };

    case 'dialog/edit':
      return {
        ...state,
        isDialogOpen: true,
        dialogCurrentUser: action.user,
      };

    case 'dialog/close':
      return {
        ...state,
        isDialogOpen: false,
        dialogCurrentUser: null,
      };

    /*
     * If an action.type isn't supported, we should at least throw an error.
     */
    default:
      throw new Error(
        `Action type ${action.type} isn't accepted by appReducer`
      );
  }
}
