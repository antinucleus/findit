export const formatDate = (time: string | undefined) => {
  if (time) {
    const date = new Date(Number(time));

    const dateString = date.toDateString().split(' ');
    const timeString = date.toTimeString();

    const month = dateString[1];
    const day = dateString[2];
    const year = dateString[3];
    const t = timeString.split(':').slice(0, 2).join(':');

    return {year, month, day, t};
  }

  return {};
};
