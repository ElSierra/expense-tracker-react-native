import { Expenses } from "./model";
import uuid from "react-native-uuid";

const today = new Date();
const yesterday = new Date(today);

yesterday.setDate(yesterday.getDate() - 1);

export const EXPENSE_DATA = [

    new Expenses(uuid.v4().toString(),'Others', 'Welcome',0, yesterday )
];
