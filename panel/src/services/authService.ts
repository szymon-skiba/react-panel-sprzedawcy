export const isAuthenticated = (): boolean => !!localStorage.getItem('authToken');

export const logout = () => {
  localStorage.removeItem('authToken');
};
