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

export function getLessThanDate(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function isDateToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
