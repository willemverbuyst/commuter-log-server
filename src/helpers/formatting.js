export const reverseRoute = (route) => {
  const [start, end] = route.split(' - ');
  return `${end} - ${start}`;
};
