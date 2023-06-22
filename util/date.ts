import {
  eachDayOfInterval,
  format,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";
import { Expenses } from "../data/model";
import { enUS } from "date-fns/locale";

function isDate7DaysLess(inputDate: Date): boolean {
  const currentDate = new Date();
  const threeDaysAgo = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  return inputDate.getTime() <= threeDaysAgo.getTime();
}

export function getFormatDate(date: Date): string {
  if (isDate7DaysLess(date)) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return format(date, "EEE", { locale: enUS });
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

function getDatesForCurrentWeek(): Date[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek
  );
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(
      sunday.getFullYear(),
      sunday.getMonth(),
      sunday.getDate() + i
    );
    dates.push(date);
  }

  return dates;
}

export function filterExpenseForCurrentWeek(expense: Expenses[]): Expenses[] {
  console.log(
    "🚀 ~ file: date.ts:57 ~ filterExpenseForCurrentWeek ~ datesForCurrentWeek:",
    getDatesForCurrentWeek
  );

  return expense.filter((expense) => {
    return getDatesForCurrentWeek().some((date) => {
      return (
        date.getFullYear() === expense.date.getFullYear() &&
        date.getMonth() === expense.date.getMonth() &&
        date.getDate() === expense.date.getDate()
      );
    });
  });
}

export function getAmountsPerDay(expense: Expenses[]) {
  const newList = expense.reduce((acc: Expenses[], expense) => {
    const date = new Date(
      expense.date.getFullYear(),
      expense.date.getMonth(),
      expense.date.getDate()
    );
    const existingExpense = acc.find((item) => {
      const itemDate = new Date(
        item.date.getFullYear(),
        item.date.getMonth(),
        item.date.getDate()
      );
      return itemDate.getTime() === date.getTime();
    });
    if (existingExpense) {
      existingExpense.amount += expense.amount;
    } else {
      acc.push({
        date,
        amount: expense.amount,
        id: "",
        category: null,
        name: "",
      });
    }
    return acc;
  }, []);

  const amounts = newList.map((item) => item.amount);
  return amounts;
}
