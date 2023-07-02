import { FlashList } from "@shopify/flash-list";
import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import ListContainer from "./ListContainer";
import { Expenses } from "../../data/model";
import { FlatList, LayoutAnimation, RefreshControl, View } from "react-native";
import { fetchExpenses } from "../../util/http";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setExpense } from "../../redux/slice/expenseSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
export default function ExpenseList({
  expenses,
  ListHeaderComponent,
}: {
  expenses: Expenses[];
  ListHeaderComponent?: JSX.Element;
}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const memoExpense = useMemo(() => expenses, [expenses]);

  const onRefresh = React.useCallback(() => {
    async function getExpenses() {
      let expenseList: {
        id: string;
        name: string;
        category: any;
        date: any;
        amount: number;
      }[] = [];

      const expenses = await firestore()
        .collection("expenses")
        .doc(auth().currentUser?.uid)
        .collection("data")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            const snap = {
              id: documentSnapshot.id,
              name: documentSnapshot.data().name,
              category: documentSnapshot.data().category,
              date: documentSnapshot.data().date.toDate(),
              amount: documentSnapshot.data().amount,
            };
            expenseList.push(snap);
          });
        });

      console.log(
        "🚀 ~ file: ExpenseList.tsx:31 ~ getExpenses ~ expenseList:",
        expenseList
      );

      dispatch(setExpense(expenseList));
    }
    getExpenses();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        estimatedItemSize={80}
        data={memoExpense}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListContainer expense={item} />}
      />
    </View>
  );
}
