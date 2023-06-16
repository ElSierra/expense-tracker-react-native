import { format, formatDistance, formatRelative, subDays } from "date-fns";

function isDate3DaysLess(inputDate: Date): boolean {
  const currentDate = new Date();
  const threeDaysAgo = new Date(
    currentDate.getTime() - 3 * 24 * 60 * 60 * 1000
  );

  return inputDate.getTime() <= threeDaysAgo.getTime();
}

export function getFormatDate(date: Date): string {
  if (isDate3DaysLess(date)) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return formatDistance(date, new Date(), { addSuffix: true });
}
