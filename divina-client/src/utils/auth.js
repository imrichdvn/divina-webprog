export function getAuth() {
  return {
    token: localStorage.getItem('token'),
    type: localStorage.getItem('type'),
    firstName: localStorage.getItem('firstName'),
  };
}

export function setAuth({ token, type, firstName }) {
  localStorage.setItem('token', token);
  localStorage.setItem('type', type);
  localStorage.setItem('firstName', firstName || '');
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('type');
  localStorage.removeItem('firstName');
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'));
}
