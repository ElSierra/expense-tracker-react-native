import { Category, Expenses } from "../data/model";
import axios from "axios";
import { ExpenseAddState } from "../redux/slice/expenseSlice";

const BACKEND_URL = "https://expense-ec0ce-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData: {
  name: string;
  date: Date;
  category: Category;
  amount: number;
}) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  //console.log("🚀 ~ file: http.tsx:15 ~ response:", response.data);

  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      category: response.data[key].category,
      name: response.data[key].name,
    };
    expenses.push(expenseObj);
  }
 
  return expenses;
}

export function updateExpenseOnline(id: string, expenseData: ExpenseAddState) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpenseOnline(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
