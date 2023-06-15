type Category = "Food" | "Transport" | "Movie" | "Internet" | "Others";

export class Expenses {
  id: string;
  category: Category;
  name: string;
  amount: number;
  day: string;
  date: Date
  constructor(
    id: string,
    category: Category,
    name: string,
    amount: number,
    day: string,
    date: Date,
  ) {
    this.id = id;
    this.category = category;
    this.name = name;
    this.day = day;
    this.amount = amount;
    this.date = date;
  }
}
