export const pd = fun => (event) => {
  event.preventDefault();
  return fun && fun();
};

export default pd;
