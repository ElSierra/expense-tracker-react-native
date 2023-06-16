import { FlashList } from "@shopify/flash-list";
import React, { ReactNode } from "react";
import ListContainer from "./ListContainer";
import { Expenses } from "../../data/model";
import { FlatList, View } from "react-native";

export default function ExpenseList({
  expenses,
  ListHeaderComponent,
}: {
  expenses: Expenses[];
  ListHeaderComponent?: JSX.Element;
}) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        estimatedItemSize={20}
        data={expenses}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListContainer expense={item} />}
      />
    </View>
  );
}
