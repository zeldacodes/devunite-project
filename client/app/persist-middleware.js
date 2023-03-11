export const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  localStorage.setItem("auth", JSON.stringify(store.getState().auth));
  return result;
};
