export const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear() % 2000;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};
