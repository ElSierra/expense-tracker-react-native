import { FlashList } from "@shopify/flash-list";
import React, { ReactNode, useEffect, useLayoutEffect, useMemo, useState } from "react";
import ListContainer from "./ListContainer";
import { Expenses } from "../../data/model";
import { FlatList, LayoutAnimation, RefreshControl, View } from "react-native";

export default function ExpenseList({
  expenses,
  ListHeaderComponent,
}: {
  expenses: Expenses[];
  ListHeaderComponent?: JSX.Element;
}) {
  const [refreshing, setRefreshing] = React.useState(false);
const memoExpense = useMemo(() => expenses, [expenses])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
