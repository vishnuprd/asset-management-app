export const getUser = async () => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).token
    : null;
  const response = await fetch(`${process.env.REACT_APP_API_URL}/get-user`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const user = await response.json();
  return user;
};
