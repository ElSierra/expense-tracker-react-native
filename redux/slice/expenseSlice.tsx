import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Expenses } from "../../data/model";
import uuid from "react-native-uuid";
import { EXPENSE_DATA } from "../../data/data";

type ExpenseState = {
  expenses: Expenses[];
};
type ExpenseAddState = {
  category: Category;
  name: string;
  amount: number;
  date: Date;
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: EXPENSE_DATA,
  } as ExpenseState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseAddState>) => {
      const expense = { ...action.payload, id: uuid.v4().toString() };
      state.expenses.push(expense);
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      const expenseList = state.expenses;

      const newList = expenseList.filter(
        (expense) => expense.id !== action.payload.id
      );

      state.expenses = newList;
    },
    updateExpense: (
      state,
      action: PayloadAction<{ id: string; expense: ExpenseAddState }>
    ) => {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state.expenses[expenseIndex];
      console.log(
        "🚀 ~ file: expenseSlice.tsx:44 ~ updatableExpense:",
        updatableExpense
      );
      const updatedItem = { ...updatableExpense, ...action.payload.expense };
      console.log("🚀 ~ file: expenseSlice.tsx:46 ~ updatedItem:", updatedItem);

      state.expenses[expenseIndex] = updatedItem;
    },
    doNothing: (state) => {
      const expList = [...state.expenses];
      state.expenses = expList
    },
  },
});

export const { addExpense, deleteExpense, updateExpense, doNothing } =
  expenseSlice.actions;
export default expenseSlice.reducer;
