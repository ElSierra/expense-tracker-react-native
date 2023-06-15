import { Expenses } from "./model";

export const EXPENSE_DATA = [
  new Expenses("1", "Food", "Food", 500.1, "Monday", new Date("2023-4-3")),
  new Expenses("2", "Internet", "MTN", 5000, "Tuesday", new Date("2023-4-4")),
  new Expenses(
    "3",
    "Transport",
    "Transport",
    5000,
    "Wednesday",
    new Date("2023-4-5")
  ),
  new Expenses("4", "Movie", "Fast X", 10000, "Thursday", new Date("2023-4-5")),
  new Expenses("5", "Others", "Flenjo", 50000, "Friday", new Date("2023-4-7")),
  new Expenses("6", "Food", "Food", 5000, "Monday, ", new Date("2023-4-21")),
  new Expenses("7", "Food", "Food", 5000, "Monday", new Date("2023-4-23")),
];
