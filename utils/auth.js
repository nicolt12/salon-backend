
export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
export const getRol = () =>
  localStorage.getItem("rol") || sessionStorage.getItem("rol");