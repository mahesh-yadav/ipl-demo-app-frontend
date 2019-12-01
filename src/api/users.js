export const createUser = async ({ name, email, password }) => {
  try {
    let response = await fetch(`http://localhost:4000/users`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: name,
        email,
        password,
      }),
    });

    let result = await response.json();
    if (response.ok) {
      return result;
    } else if (response.status === 422) {
      throw result;
    } else if (response.status === 500) {
      throw result.error;
    }
  } catch (error) {
    throw error;
  }
};

export const signin = async ({ email, password }) => {
  try {
    let response = await fetch(`http://localhost:4000/signin`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let result = await response.json();
    if (response.ok) {
      return result;
    } else if (response.status === 422) {
      throw result;
    } else if (response.status === 500 || response.status === 401) {
      throw result.error;
    }
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (userId, token) => {
  try {
    let response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    let result = await response.json();
    if (response.ok) {
      return result;
    } else if (response.status === 422) {
      throw result;
    } else if (
      response.status === 500 ||
      response.status === 403 ||
      response.status === 401
    ) {
      throw result.error;
    }
  } catch (error) {
    throw error;
  }
};
