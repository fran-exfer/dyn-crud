const endpoint = 'https://dyn-crud.herokuapp.com/api/users/';

export async function getAllUsers() {
  try {
    const data = await fetch(endpoint);
    return await data.json();
  } catch (error) {
    throw new Error('API ERROR: Could not fetch all users.');
  }
}

export async function createUser(body) {
  try {
    const data = await fetch(endpoint, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await data.json();
  } catch {
    throw new Error('API ERROR: There was an error creating a user.');
  }
}

export async function updateUser(user, body) {
  try {
    const data = await fetch(endpoint + user._id, {
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await data.json();
  } catch {
    throw new Error('API ERROR: There was an error updating a user.');
  }
}

export function deleteUser(user) {
  try {
    return fetch(endpoint + user._id, {
      method: 'DELETE',
    });
  } catch {
    throw new Error('API ERROR: There was an error deleting a user.');
  }
}
