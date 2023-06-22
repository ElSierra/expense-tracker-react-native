import { Expenses } from "./model";
import uuid from "react-native-uuid";

export const EXPENSE_DATA = [
  new Expenses(
    uuid.v4().toString(),
    "Others",
    "👋 Expense Tracker",
    0,
    new Date()
  ),
];
