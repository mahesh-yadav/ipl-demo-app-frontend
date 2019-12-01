export const fetchMatches = async (searchTerm, filter, skip, limit) => {
  try {
    let response = await fetch(
      `http://localhost:4000/matches?search=${searchTerm}&filter=${filter}&skip=${skip}$limit=${limit}`,
      {
        method: 'GET',
        mode: 'cors',
      }
    );

    let data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw data.error;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchMatchById = async (id) => {
  try {
    let response = await fetch(`http://localhost:4000/matches/${id}`, {
      method: 'GET',
      mode: 'cors',
    });

    let data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw data.error;
    }
  } catch (error) {
    throw error;
  }
};
