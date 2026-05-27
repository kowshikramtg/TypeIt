export const isSameDay = (
  d1: Date,
  d2: Date
) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const differenceInDays = (
  d1: Date,
  d2: Date
) => {
  const diff =
    Math.abs(d1.getTime() - d2.getTime());

  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
};