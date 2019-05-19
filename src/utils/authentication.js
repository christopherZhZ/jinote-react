export function setUser(user) {
  return localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const userString = localStorage.getItem('user');
  let user = null;
  try {
    user = JSON.parse(userString);
  } catch (e) {
    user = userString;
  }
  return user;
}

export function getUserIdOrEmpty() {
  return getUser() ? getUser().id : '';
}
