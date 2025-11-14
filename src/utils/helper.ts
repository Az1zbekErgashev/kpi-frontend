import dayjs, { Dayjs } from 'dayjs';

export const dateFormatByLanguage = (date: string | Dayjs) => {
  const language = localStorage.getItem('language') || 'en';

  let parsedDate = dayjs(date, 'DD.MM.YYYY');

  if (!parsedDate.isValid()) {
    parsedDate = dayjs(date);
  }

return parsedDate.isValid() && Number(language) == 0
    ? parsedDate.format('YYYY.MM.DD')
    : parsedDate.format('DD.MM.YYYY');
};


export const dateTimeFormatByLanguage = (date: string | Dayjs) => {
  const language = localStorage.getItem('language') || 'en';

  let parsedDate = dayjs(date, 'DD.MM.YYYY HH:mm:ss');

  if (!parsedDate.isValid()) {
    parsedDate = dayjs(date);
  }

  return parsedDate.isValid() && Number(language) == 0
    ? parsedDate.format('YYYY.MM.DD HH:mm')
    : parsedDate.format('DD.MM.YYYY HH:mm');
};