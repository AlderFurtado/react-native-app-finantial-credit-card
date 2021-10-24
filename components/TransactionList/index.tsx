import React from "react";
import { FlatList, ScrollViewProps } from "react-native";
import { Box } from "../Box";
import { Label } from "../Label";
import Space from "../Space";
import { TransactionItem, TransactionItemProps } from "../TransactionItem";

export interface TransactionListProps extends ScrollViewProps {
  transitionsItem: TransactionItemProps[];
}

export const TransactionList = ({
  transitionsItem,
  ...rest
}: TransactionListProps) => {
  return (
    <FlatList
      {...rest}
      ListHeaderComponent={
        <>
          <Label type="subtitle">Transações recentes</Label>
          <Space size={32} type="vertical" />
        </>
      }
      data={transitionsItem}
      keyExtractor={(item: TransactionItemProps) => item.description}
      renderItem={({ item }) => {
        return <TransactionItem {...item} />;
      }}
      ItemSeparatorComponent={() => <Space type="vertical" size={32} />}
      ListEmptyComponent={
        <Box
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Label type="support">Você ainda não possue nenhuma transação</Label>
        </Box>
      }
    />
  );
};
